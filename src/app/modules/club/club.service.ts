import { Club } from './club.model';
import { IClub } from './club.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { Types } from 'mongoose';
import { CLUB_ROLE, clubSearchableField } from './club.constant';
import { emailTemplate } from '../../../shared/emailTemplate';
import { User } from '../user/user.model';
import { emailHelper } from '../../../helpers/emailHelper';

//Create a new club
const createClub = async (payload: IClub) => {

  const isExistThreeMember = await Club.countDocuments({ club_members: { $size: 4 } });
  if (isExistThreeMember >= 4) {
    throw new Error('You can only create a club with up to 3 members');
  }
  const clubCreator = await User.findById(payload.club_creator);

  payload.club_members.push({ user_id: payload.club_creator, role: CLUB_ROLE.CLUB_MANAGER });
  const newClub = await Club.create(payload);

  const welcomeEmailTemplate = emailTemplate.WelcomMessageForClubCreation(
    clubCreator?.email as string
  );
  emailHelper.sendEmail(welcomeEmailTemplate);
  return newClub;
};


const getAllClubs = async (userId: string, query: Record<string, any>) => {
  const result = new QueryBuilder(Club.find(), query)
    .paginate()
    .search(clubSearchableField)
    .fields()
    .filter()
    .sort();

  const clubs = await result.modelQuery.lean();
  const pagination = await result.getPaginationInfo();

  const managedClubs: any[] = [];
  const memberClubs: any[] = [];

  console.log(clubs)

  clubs.forEach((club: any) => {
    const member = club.club_members.find((m: any) => m.user_id.toString() === userId);

    if (member) {
      if (member.role === CLUB_ROLE.CLUB_MANAGER) {
        managedClubs.push(club);
      } else {
        memberClubs.push(club);
      }
    }
  });

  return {
    pagination,
    data: {
      managedClubs,
      memberClubs
    }
  };
};



//Get single club by ID
const getSingleClub = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error('Invalid club ID');

  const club = await Club.findById(id)
    .populate('club_creator')
    .populate('club_members.user_Id');
  return club;
};


//Update a club by ID

const updateClub = async (id: string, payload: Partial<IClub>) => {
  if (!Types.ObjectId.isValid(id)) throw new Error('Invalid club ID');

  const updatedClub = await Club.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedClub;
};

// Delete a club by ID

const deleteClub = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error('Invalid club ID');

  const deletedClub = await Club.findByIdAndDelete(id);
  return deletedClub;
};

// Add a new member to a club
const addMemberToClub = async (
  clubId: string,
  userId: string,
  role: string
) => {
  if (!Types.ObjectId.isValid(clubId)) throw new Error('Invalid club ID');

  const updatedClub = await Club.findByIdAndUpdate(
    clubId,
    {
      $addToSet: { club_members: { user_Id: userId, role } }, // prevents duplicates
    },
    { new: true }
  ).populate('club_members.user_Id');

  return updatedClub;
};

//Remove a member from a club
const removeMemberFromClub = async (clubId: string, userId: string) => {
  if (!Types.ObjectId.isValid(clubId)) throw new Error('Invalid club ID');

  const updatedClub = await Club.findByIdAndUpdate(
    clubId,
    { $pull: { club_members: { user_Id: userId } } },
    { new: true }
  ).populate('club_members.user_Id');

  return updatedClub;
};

//Get all clubs by creator ID
const getClubsByCreator = async (creatorId: string) => {
  const clubs = await Club.find({ club_creator: creatorId });
  return clubs;
};


const joinClub = async (clubId: string, userId: string) => {
  if (!Types.ObjectId.isValid(clubId)) throw new Error('Invalid club ID');

  const updatedClub = await Club.findByIdAndUpdate(
    clubId,
    {
      $addToSet: { club_members: { user_id: userId, role: CLUB_ROLE.USER } },
    },
    { new: true }
  );

  return updatedClub;
};


const getClubs = async (userId: string, query: Record<string, any>) => {
  const result = new QueryBuilder(Club.find(), query)
    .paginate()
    .search(clubSearchableField)
    .fields()
    .filter()
    .sort();

  let data = await result.modelQuery.lean();
  const pagination = await result.getPaginationInfo();

  data = data.map((club: any) => {
    const { club_members, ...rest } = club;
    return {
      ...rest,
      club_memers: Array.isArray(club_members) ? club_members.length : 0,
    };
  });

  return {
    pagination,
    data,
  };
};

export const ClubService = {
  createClub,
  getAllClubs,
  getSingleClub,
  updateClub,
  deleteClub,
  addMemberToClub,
  removeMemberFromClub,
  getClubsByCreator,
  joinClub,
  getClubs
};