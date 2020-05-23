//// ** Notification Endpoints:

// 1. Admin endpoint for posting a notification to the DB.
// 2. Employee Endpoint for getting their notifications.
// 3. Read Status Updater: Automatically logs the time and read-status for the given employee in a notification's read list when they
// first click on a message in their inbox.
// 4. Get All Notifications: Endpoint for manager to examine all previously sent notifications, to re-read or verify read statuses.

const router = require('express').Router();

const {
  postNotification,
  getNotifications,
  updateReadStatus,
  getAllNotifications,
} = require('../functions/notificationFunctions');

// admin endpoint for posting a notification:
router.post('/api/admin/send_notification', postNotification);
// employee endpoint for getting notifications:
router.get('/api/get_notifications/:employee', getNotifications);
// employee endpoint for updating the read status of a notification:
router.post('/api/update_read_status', updateReadStatus);
// admin endpoint for viewing read status of all previously sent messages:
router.get('/api/admin/view_all_notifications', getAllNotifications);

module.exports = router;
