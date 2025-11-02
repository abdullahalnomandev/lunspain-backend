
import QueryBuilder from '../../builder/QueryBuilder';
import { Types } from 'mongoose';
import { emailTemplate } from '../../../shared/emailTemplate';
import { User } from '../user/user.model';
import { IPOST } from './post.interface';
import { Post } from './post.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { CREATOR_TYPE, MAX_FEATURES_SKILLS, MAX_TAGGED_USERS, POST_TYPE } from './post.constant';
import { Club } from '../club/club.model';

//Create a new club
const createPost = async (payload: IPOST) => {

    console.log("payload", payload);

    if (payload.creator_type === CREATOR_TYPE.CLUB && !payload.club) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Club id is required');
    }

    if (payload.creator_type === CREATOR_TYPE.CLUB && payload.club) {
        const club = await Club.findById(payload.club).lean();

        // Check if creator is a member of the club
        const isMember = club?.club_members?.some(
            (mem: any) => mem.user_Id?.toString() === payload.creator?.toString()
        );

        if (!isMember) {
            throw new ApiError(StatusCodes.FORBIDDEN, "You are not a member of this club and cannot create a post.");
        }
    }

    if (payload.features_skills && payload.features_skills.length > MAX_FEATURES_SKILLS) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `You can only add up to ${MAX_FEATURES_SKILLS} features skills`);
    }

    if (payload.tag_user && payload.tag_user.length > MAX_TAGGED_USERS) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `You can only add up to ${MAX_TAGGED_USERS} tagged users`);
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

        // Check if creator is a member of the club
        const isMember = club?.club_members?.some(
            (mem: any) => mem.user_Id?.toString() === payload.creator?.toString()
        );

        if (!isMember) {
            throw new ApiError(StatusCodes.FORBIDDEN, "You are not a member of this club and cannot update this post.");
        }
    }

    if (payload.features_skills && payload.features_skills.length > MAX_FEATURES_SKILLS) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `You can only add up to ${MAX_FEATURES_SKILLS} features skills`);
    }

    if (payload.tag_user && payload.tag_user.length > MAX_TAGGED_USERS) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `You can only add up to ${MAX_TAGGED_USERS} tagged users`);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedPost) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
    }
    return updatedPost;
};

const getAllMyDrafts = async (userId: string) => {
    const drafts = await Post.find({creator:userId,post_type:POST_TYPE.DRAFTS});
    return drafts;
}

const deletePost = async (userId: string, postId: string) => {
    const deletedPost = await Post.findOneAndDelete({ _id: postId, creator: userId });
    if (!deletedPost) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found or you do not have permission to delete this post');
    }
    return deletedPost;
}


const findById = async (postId: string) => {
    const post = await Post.findById(postId).lean();
    if (!post) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
    }
    return post;
}


export const PostService = {
    createPost,
    getAllMyDrafts,
    updatePost,
    deletePost,
    findById
};