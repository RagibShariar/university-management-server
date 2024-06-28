export type Student = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  gender: "male" | "female";
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  nationality: string;
  religion: string;
  maritalStatus:
    | "Single"
    | "Married"
    | "Divorced"
    | "Widowed"
    | "Separated"
    | "Partnered";
  guardian: Guardian;
  localGuardian: LocalGuardian;
  image?: string;
  isActive: "active" | "blocked";
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  fatherEmail?: string;

  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  motherEmail?: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  email?: string;
  address: string;
  relation: string;
};
