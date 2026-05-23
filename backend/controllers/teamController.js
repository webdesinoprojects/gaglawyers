const TeamMember = require('../models/TeamMember');
const cloudinary = require('../config/cloudinary');

const getFallbackAvatarUrl = (name = 'Team Member') =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0A193C&color=C9A84C&size=600`;

const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ order: 1 });
    const normalizedMembers = teamMembers.map((member) => {
      const memberObj = member.toObject();
      if (!memberObj.imageUrl) {
        memberObj.imageUrl = getFallbackAvatarUrl(memberObj.name);
      }
      return memberObj;
    });
    
    // Calculate team members added this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthMembers = normalizedMembers.filter(member => 
      new Date(member.createdAt) >= startOfMonth
    ).length;
    
    res.status(200).json({
      success: true,
      count: normalizedMembers.length,
      addedThisMonth: thisMonthMembers,
      data: normalizedMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const createTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const oldMember = await TeamMember.findById(req.params.id);

    if (!oldMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    if (req.body.imageUrl && oldMember.imageUrl !== req.body.imageUrl && oldMember.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(oldMember.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    if (member.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(member.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    await TeamMember.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Team member deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
