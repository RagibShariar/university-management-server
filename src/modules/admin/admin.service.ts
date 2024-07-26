import { Admin } from "./admin.model";

// get all admins from DB
const getAllAdminsFromDB = async () => {
  const result = await Admin.find();
  return result;
};

// get single admin from DB
const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

//delete admin from DB
export const adminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
};
