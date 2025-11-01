import { Club } from './club.model';
import { IClub } from './club.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { Types } from 'mongoose';

//Create a new club
const createClub = async (payload: IClub) => {
  const newClub = await Club.create(payload);
  return newClub;
};

//Get all clubs with optional query filters
const getAllClubs = async (query: Record<string, any>) => {
  const clubQuery = new QueryBuilder(Club.find(), query)
    .search(['name', 'country', 'address', 'post_code'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await clubQuery.modelQuery;

  return {result };
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

export const ClubService = {
  createClub,
  getAllClubs,
  getSingleClub,
  updateClub,
  deleteClub,
  addMemberToClub,
  removeMemberFromClub,
  getClubsByCreator,
};