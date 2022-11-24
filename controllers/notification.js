

const SettingNotifications = require('../models/notification')


const UserSettingsNotification = async (req, res) => {
    let { UserId, ActiveNotification } = req.body;

    try {

        if ((UserId!="" && UserId!=null && UserId!=undefined && ActiveNotification!="" && ActiveNotification!=null && ActiveNotification!=undefined)) {
            res.json({ message: "All fields are required", status: false });
        } else {

            const SettingUser = await  SettingNotifications.findOne({ UserId });
            if (! SettingUser) {
                const NewUserSetting = await SettingNotifications.create({ UserId, ActiveNotification });
                if (NewUserSetting) res.status(200).json({ message: "UserSetting Updated", data: NewUserSetting, status: true, });
                res.status(400).json({ message: "Usersetting  not Updated", status: false });
            } else {
                const UpdateUserSetting = await SettingNotifications.findOneAndUpdate({ UserId }, { ActiveNotification });
                if (UpdateUserSetting) res.status(200).json({ message: "UserSetting Updated", data: UpdateUserSetting, status: true, });
                res.status(400).json({ message: "Usersetting  not Updated", status: false });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};





//get notification
const ViewDataNotification = async (req, res) => {
    try {
        const getDetails = await SettingNotifications .findOne({_id: req.params.id });
      if (!getDetails) {
        res.status(400).json({ message: "Enter the correct id", status: false });
      } else {
        res.status(200).json({
          message: "Notification is Created successfully",
          data:getDetails,
          status: true
        });
  
      }
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  };
  







  module.exports ={
    UserSettingsNotification,
    ViewDataNotification
  }