import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { CLUB_ROLE } from '../club/club.constant';
import { Club } from '../club/club.model';
import { ClubMember } from '../club/club_members/club_members.model';
import { Comment } from './comment/comment.model';
import { Like } from './like';
import {
  clubSearchableField,
  CREATOR_TYPE,
  MAX_FEATURES_SKILLS,
  MAX_TAGGED_USERS,
  POST_SERCH_TYPE,
  POST_TYPE,
  postSearchableField,
  userSearchableField,
} from './post.constant';
import { IPOST } from './post.interface';
import { Post } from './post.model';
import { User } from '../user/user.model';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { Follower } from '../user/follower/follower.model';

//Create a new club
const createPost = async (payload: IPOST) => {

  if (payload.post_type === POST_TYPE.PHOTO && !payload.image) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Photo is required');
  }
  if (payload.post_type === POST_TYPE.VIDEO && !payload.media) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Video is required');
  }

  if (payload.creator_type === CREATOR_TYPE.CLUB && !payload.club) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Club id is required');
  }

  if (payload.creator_type === CREATOR_TYPE.CLUB && payload.club) {
    const club = await Club.findById(payload.club).lean();

    // Check if creator is a member of the club
    if (!club) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Club not found.');
    }
    const isCLubMember = await ClubMember.findOne({
      club: club._id,
      user: payload.creator,
      role: CLUB_ROLE.CLUB_MANAGER,
    }).lean();

    if (!isCLubMember) {
      throw new ApiError(
        StatusCodes.FORBIDDEN,
        'You are not a manager/member of this club and cannot create a post.'
      );
    }
  }

  if (
    payload.features_skills &&
    payload.features_skills.length > MAX_FEATURES_SKILLS
  ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `You can only add up to ${MAX_FEATURES_SKILLS} features skills`
    );
  }

  if (payload.tag_user && payload.tag_user.length > MAX_TAGGED_USERS) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `You can only add up to ${MAX_TAGGED_USERS} tagged users`
    );
  }

  const post = await Post.create(payload);
  return post;
};

//update club post
const updatePost = async (id: string, payload: Partial<IPOST>) => {
  if (payload.creator_type === CREATOR_TYPE.CLUB && !payload.club) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Club id is required');
  }

  if (payload.creator_type === CREATOR_TYPE.CLUB && payload.club) {
    const club = await Club.findById(payload.club).lean();
    const isMember = await ClubMember.findOne({
      club: club?._id,
      user: payload.creator,
      role: CLUB_ROLE.CLUB_MANAGER,
    }).lean();

    if (!isMember) {
      throw new ApiError(
        StatusCodes.FORBIDDEN,
        'You are not a member of this club and cannot update this post.'
      );
    }
  }

  if (
    payload.features_skills &&
    payload.features_skills.length > MAX_FEATURES_SKILLS
  ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `You can only add up to ${MAX_FEATURES_SKILLS} features skills`
    );
  }

  if (payload.tag_user && payload.tag_user.length > MAX_TAGGED_USERS) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `You can only add up to ${MAX_TAGGED_USERS} tagged users`
    );
  }
  const isEditable = await Post.findById(id, 'createdAt').lean();
  if (!isEditable) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
  }
  const createdAt = new Date(isEditable?.createdAt || '').getTime();
  const now = Date.now();
  const thirtyMinutes = 30 * 60 * 1000;
  if (now - createdAt > thirtyMinutes) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'You can only edit a post within 30 minutes of creation'
    );
  }

  const updatedPost = await Post.findByIdAndUpdate(id, payload, { new: true });
  if (!updatedPost) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
  }
  return updatedPost;
};

const getAllMyDrafts = async (userId: string,query:any) => {

  let newQuery = {
    creator: userId,
    post_type: POST_TYPE.DRAFTS,
  }
  if(query.club){
    //@ts-ignore
    newQuery.club = query.club;
  }
  if(query.club){
    //@ts-ignore
    newQuery.creator_type = CREATOR_TYPE.CLUB;
  }else{
    //@ts-ignore
    newQuery.creator_type = CREATOR_TYPE.USER;
  }
  const drafts = await Post.find({
    ...newQuery,
  }).lean();

  if (!drafts) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No drafts found');
  }

  return drafts;
};

const deletePost = async (userId: string, postId: string) => {
  // Check if the post exists
  const post = await Post.findById(postId).lean();
  if (!post) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
  }
  if (
    post?.creator?.toString() !== userId &&
    post.creator_type === CREATOR_TYPE.USER
  ) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'You do not have permission to delete this post'
    );
  }

  if (post.creator_type === CREATOR_TYPE.CLUB) {
    const isClubMember = await ClubMember.findOne({
      club: post.club,
      user: userId,
      role: CLUB_ROLE.CLUB_MANAGER,
    }).lean();

    if (!isClubMember) {
      throw new ApiError(
        StatusCodes.FORBIDDEN,
        'You are not a manager/member of this club and cannot delete this post.'
      );
    }
  }

  const deletedPost = await Post.findOneAndDelete({
    _id: postId,
    creator: userId,
  });
  if (!deletedPost) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Post not found or you do not have permission to delete this post'
    );
  }

  return deletedPost;
};

const findById = async (postId: string) => {
  const post = await Post.findById(postId).lean().populate('creator', 'profile.username  profile.image').populate('club', 'name image');;
  if (!post) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
  }
  const [commentOfPost, likeOfPost] = await Promise.all([
    Comment.countDocuments({ post: post._id }),
    Like.countDocuments({ post: post._id }),
  ]);
  return {
    ...post,
    commentOfPost,
    likeOfPost,
  };
};
const getAllPosts = async (query: Record<string, any>, userId: string) => {
  // Build the query with pagination, filtering, sorting, and field selection
  const userQuery = new QueryBuilder(Post.find({post_type: { $ne: POST_TYPE.DRAFTS }}), query)
    .paginate()
    .fields()
    .filter()
    .sort();

  // Execute the query to get the posts
  const result = await userQuery.modelQuery;

  // Enrich each post with comment count, like count, and editable status
  const dataWithEditable = await Promise.all(
    result.map(async (post: any) => {
      const [commentOfPost, likeOfPost] = await Promise.all([
        Comment.countDocuments({ post: post._id }).lean(),
        Like.countDocuments({ post: post._id }).lean(),
      ]);

      const isCreator = post.creator.toString() === userId;
      const createdAt = new Date(post.createdAt).getTime();
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;
      const isEditable = isCreator && now - createdAt <= thirtyMinutes;

      return {
        ...post.toObject(),
        commentOfPost,
        likeOfPost,
        editable: isEditable,
      };
    })
  );

  // Get pagination metadata
  const pagination = await userQuery.getPaginationInfo();

  return {
    data: dataWithEditable,
    pagination,
  };
};

const getALlTypeOfpost = async (
  postType: string,
  userId: string,
  query: Record<string, any>
) => {
  let buildQuery: any;
  let searchableField: string[];

  switch (postType) {
    case POST_SERCH_TYPE.PHOTO:
      buildQuery = Post.find({ post_type: POST_TYPE.PHOTO }).populate('creator', 'profile.image profile.username email bio').populate('club', 'name image');
      searchableField = postSearchableField;
      break;
    case POST_SERCH_TYPE.CLUB:
      buildQuery = Club.find().populate('club_creator', 'profile.image profile.username email bio');
      searchableField = clubSearchableField;
      break;
    case POST_SERCH_TYPE.USER:
      buildQuery = User.find({ _id: { $ne: userId } }).populate('profile.image profile.username email');
      searchableField = userSearchableField;
      break;
    case POST_SERCH_TYPE.VIDEO:
      buildQuery = Post.find({ post_type: POST_TYPE.VIDEO }).populate('creator', 'profile.image profile.username email bio').populate('club', 'name image');
      searchableField = postSearchableField;
      break;
    case POST_SERCH_TYPE.SKILL:
      buildQuery = Post.find({ post_type: {$ne: POST_TYPE.DRAFTS} }).populate('creator', 'profile.image profile.username email bio').populate('club', 'name image');
      searchableField = postSearchableField;
      break;
    default:
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `Invalid post type. Provide (${POST_SERCH_TYPE.PHOTO} or ${POST_SERCH_TYPE.CLUB} or ${POST_SERCH_TYPE.USER} or ${POST_SERCH_TYPE.VIDEO} or ${POST_SERCH_TYPE.SKILL} ) `
      );
  }

  // Add more fields to select (first query "response") by default
  // For direct selects not using .fields(), ensure mongoose returns full document objects
  // Use lean() if you do NOT want mongoose models, but for "more" keep as objects
  const postQueryBuilder = new QueryBuilder(buildQuery, query)
    .paginate()
    .search(searchableField)
    .fields() // This can limit fields, but user can ask for all
    .filter()
    .sort();

  let posts = await postQueryBuilder.modelQuery;

  // For CLUB type, aggregate club member counts in a single query to reduce time complexity
  if (postType === POST_SERCH_TYPE.CLUB && posts.length > 0) {
    const clubIds = posts.map((club: any) => club._id);
    const memberCounts = await ClubMember.aggregate([
      { $match: { club: { $in: clubIds } } },
      { $group: { _id: '$club', count: { $sum: 1 } } },
    ]);
    const countMap: Record<string, number> = {};
    memberCounts.forEach(item => { countMap[item._id.toString()] = item.count; });
    posts = posts.map((club: any) => ({
      ...club.toObject(),
      club_members: countMap[club._id.toString()] || 0,
      // Add more info for "more" query:
      name: club.name,
      description: club.description,
      image: club.image,
      createdAt: club.createdAt,
      updatedAt: club.updatedAt,
      club_creator: club.club_creator ? {
        _id: club.club_creator._id,
        profile: club.club_creator.profile,
        email: club.club_creator.email,
        bio: club.club_creator.bio
      } : undefined
    }));
  }

  // For USER type, aggregate following in a single query to reduce time complexity
  if (postType === POST_SERCH_TYPE.USER && posts.length > 0) {
    const userIds = posts.map((user: any) => user._id);
    const followed = await Follower.find({
      follower: userId,
      following: { $in: userIds }
    }).select('following').lean();

    const followedSet = new Set(followed.map((item: any) => item.following.toString()));
    posts = posts.map((user: any) => ({
      ...user.toObject(),
      isFollowed: followedSet.has(user._id.toString()),
      // More info
      username: user.username,
      email: user.email,
      bio: user.bio,
      createdAt: user.createdAt,
      profile: user.profile
    }));
  }

  // For PHOTO/VIDEO/SKILL, aggregate comment/like counts and likes in batch
  if (
    postType === POST_SERCH_TYPE.PHOTO ||
    postType === POST_SERCH_TYPE.VIDEO ||
    postType === POST_SERCH_TYPE.SKILL
  ) {
    const postIds = posts.map((post: any) => post._id);

    // Aggregate comment counts
    const commentsAgg = await Comment.aggregate([
      { $match: { post: { $in: postIds } } },
      { $group: { _id: '$post', count: { $sum: 1 } } }
    ]);
    const commentCountMap: Record<string, number> = {};
    commentsAgg.forEach(item => { commentCountMap[item._id.toString()] = item.count; });

    // Aggregate like counts
    const likesAgg = await Like.aggregate([
      { $match: { post: { $in: postIds } } },
      { $group: { _id: '$post', count: { $sum: 1 } } }
    ]);
    const likeCountMap: Record<string, number> = {};
    likesAgg.forEach(item => { likeCountMap[item._id.toString()] = item.count; });

    // Find all liked posts by user in batch
    const liked = await Like.find({
      user: userId,
      post: { $in: postIds }
    }).select('post').lean();
    const likedSet = new Set(liked.map((l: any) => l.post.toString()));

    posts = posts.map((post: any) => {
      const isCreator = post?.creator?._id?.toString() === userId;
      const createdAt = new Date(post.createdAt).getTime();
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;
      const isEditable = isCreator && now - createdAt <= thirtyMinutes;
      // Add more post info for "more" response
      return {
        ...post.toObject(),
        commentOfPost: commentCountMap[post._id.toString()] || 0,
        likeOfPost: likeCountMap[post._id.toString()] || 0,
        isCreator: post.creator?._id?.toString() === userId,
        hasLiked: likedSet.has(post._id.toString()),
        editable: isEditable,
        caption: post.caption,
        media: post.media,
        tags: post.tags,
        club: post.club,
        creator: post.creator,
        post_type: post.post_type,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      };
    });
  }

  const pagination = await postQueryBuilder.getPaginationInfo();

  return {
    pagination,
    data: posts,
    // Add the "raw" output before transformations (e.g. in case you want to see the direct Mongoose result)
    // raw: resultBeforeTransform, // Uncomment if needed for deeper debugging
    total: pagination ? pagination.total : posts.length // Explicit total count, more info in response
  };
};
// const getALlTypeOfpost = async (
//   postType: string,
//   userId: string,
//   query: Record<string, any>
// ) => {
//   let buildQuery: any;
//   let searchableField: string[];

//   switch (postType) {
//     case POST_SERCH_TYPE.PHOTO:
//       buildQuery = Post.find({ post_type: POST_TYPE.PHOTO }).populate('creator', 'profile.image profile.username').populate('club', 'name image');
//       searchableField = postSearchableField;
//       break;
//     case POST_SERCH_TYPE.CLUB:
//       buildQuery = Club.find().populate('club_creator','profile.image profile.username');
//       searchableField = clubSearchableField;
//       break;
//     case POST_SERCH_TYPE.USER:
//       buildQuery = User.find({ _id: { $ne: userId } }).populate('profile.image profile.username');
//       searchableField = userSearchableField;
//       break;
//     case POST_SERCH_TYPE.VIDEO:
//       buildQuery = Post.find({ post_type: POST_TYPE.VIDEO }).populate('creator','profile.image profile.username');
//       searchableField = postSearchableField;
//       break;
//     case POST_SERCH_TYPE.SKILL:
//       buildQuery = Post.find({post_type:{$ne:POST_TYPE.DRAFTS}}).populate('creator','profile.image profile.username').populate('club', 'name image');;
//       searchableField = postSearchableField;
//       break;
//     default:
//       throw new ApiError(
//         StatusCodes.BAD_REQUEST,
//         `Invalid post type. Provide (${POST_SERCH_TYPE.PHOTO} or ${POST_SERCH_TYPE.CLUB} or ${POST_SERCH_TYPE.USER} or ${POST_SERCH_TYPE.VIDEO} or ${POST_SERCH_TYPE.SKILL} ) `
//       );
//   }

//   const postQueryBuilder = new QueryBuilder(buildQuery, query)
//     .paginate()
//     .search(searchableField)
//     .fields()
//     .filter()
//     .sort();

//   let posts = await postQueryBuilder.modelQuery;

//   if (postType === POST_SERCH_TYPE.CLUB) {
//     posts = await Promise.all(
//       posts.map(async (club: any) => {
//         const memberCount = await ClubMember.countDocuments({
//           club: club._id,
//         });
//         return { ...club.toObject(), club_members: memberCount };
//       })
//     );
//   }

//   if (postType === POST_SERCH_TYPE.USER) {
//     posts = await Promise.all(
//       posts.map(async (user: any) => {
//         const isFollowed = await Follower.findOne({
//           follower: userId,
//           following: user?._id,
//         });
//         return { ...user.toObject(), isFollowed: !!isFollowed };
//       })
//     );
//   }

//   if (
//     postType === POST_SERCH_TYPE.PHOTO ||
//     postType === POST_SERCH_TYPE.VIDEO ||
//     postType === POST_SERCH_TYPE.SKILL
//   ) {
//     posts = await Promise.all(
//       posts.map(async (post: any) => {

//         const [commentOfPost, likeOfPost, isLiked] = await Promise.all([
//           Comment.countDocuments({ post: post._id }).lean().exec(),
//           Like.countDocuments({ post: post._id }).lean().exec(),
//           Like.exists({ user: userId, post: post._id }).lean().exec(),
//         ]);

//         const isCreator = post?.creator?._id?.toString() === userId;
//         const createdAt = new Date(post.createdAt).getTime();
//         const now = Date.now();
//         const thirtyMinutes = 30 * 60 * 1000;
//         const isEditable = isCreator && now - createdAt <= thirtyMinutes;
//         return {
//           ...post.toObject(),
//           commentOfPost,
//           likeOfPost,
//           isCreator: post.creator?._id.toString() === userId,
//           hasLiked: !!isLiked,
//           editable: isEditable
//         };
//       })
//     );
//   }

//   const pagination = await postQueryBuilder.getPaginationInfo();

//   return {
//     pagination,
//     data: posts,
//   };
// };

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const getALlUserLikedPost = async (
  userId: string,
  query: Record<string, any>
) => {
  const userQuery = new QueryBuilder(Like.find({ user: userId }), query)
    .paginate()
    .fields()
    .filter()
    .sort();

  const result = await userQuery.modelQuery.populate('post');

  const grouped: Record<string, any[]> = {
    today: [],
    yesterday: [],
    two_days_ago: [],
    this_week: [],
    this_month: [],
    this_year: [],
    after_this_year: [],
  };

  result.forEach((like: any) => {
    const createdAt = dayjs(like.createdAt);
    let key: string | null = null;

    if (createdAt.isToday()) key = 'today';
    else if (createdAt.isYesterday()) key = 'yesterday';
    else if (createdAt.isAfter(dayjs().subtract(2, 'day')))
      key = 'two_days_ago';
    else if (createdAt.isAfter(dayjs().subtract(7, 'day'))) key = 'this_week';
    else if (createdAt.isAfter(dayjs().startOf('month'))) key = 'this_month';
    else if (createdAt.isAfter(dayjs().startOf('year'))) key = 'this_year';
    else {
      grouped.after_this_year.push(like);
      return;
    }

    if (key) grouped[key].push(like);
  });

  const pagination = await userQuery.getPaginationInfo();

  return {
    pagination,
    data: grouped,
  };
};


const getPostsByClub = async (clubId: string, userId: string,query: Record<string, any>) => {

  const result = new QueryBuilder(
    Post.find({ club: clubId }),
    query
  )
    .paginate()
    .fields()
    .filter()
    .sort();

  const posts = await result.modelQuery;
  const pagination = await result.getPaginationInfo();

  return {
    pagination,
    data: posts,
  };
}
export const PostService = {
  createPost,
  getAllMyDrafts,
  updatePost,
  deletePost,
  findById,
  getAllPosts,
  getALlTypeOfpost,
  getALlUserLikedPost,
  getPostsByClub
};
