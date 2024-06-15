import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export default async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    const isCodeValid = user.verifyCode == code;
    const isCodeNotExperied = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExperied) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User Verified",
        },
        { status: 200 }
      );
    } else if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Code not valid",
        },
        { status: 400 }
      );
    } else if (!isCodeNotExperied) {
      return Response.json(
        {
          success: false,
          message: "Verify Code Expired",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error in verifying user",
      },
      { status: 500 }
    );
  }
}
