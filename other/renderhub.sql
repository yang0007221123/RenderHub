/*
Navicat MySQL Data Transfer

Source Server         : MyConnection
Source Server Version : 80037
Source Host           : localhost:3306
Source Database       : renderhub

Target Server Type    : MYSQL
Target Server Version : 80037
File Encoding         : 65001

Date: 2024-06-14 23:43:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(200) NOT NULL,
  `moment_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '32131', '16', null, '8', '2024-06-13 16:55:34', '2024-06-13 16:55:34');
INSERT INTO `comment` VALUES ('2', '32131', '16', null, '8', '2024-06-13 16:56:31', '2024-06-13 16:56:31');
INSERT INTO `comment` VALUES ('3', '32131', '16', null, '8', '2024-06-13 16:57:20', '2024-06-13 16:57:20');
INSERT INTO `comment` VALUES ('4', '32131', '16', '1', '8', '2024-06-13 16:59:26', '2024-06-13 16:59:26');
INSERT INTO `comment` VALUES ('5', '32131', '16', null, '8', '2024-06-13 17:02:06', '2024-06-13 17:02:06');
INSERT INTO `comment` VALUES ('6', '32131', '16', null, '8', '2024-06-13 17:08:03', '2024-06-13 17:08:03');
INSERT INTO `comment` VALUES ('7', '32131', '16', null, '8', '2024-06-13 17:08:03', '2024-06-13 17:08:03');
INSERT INTO `comment` VALUES ('8', '火狐换股', '5', null, '8', '2024-06-13 17:49:18', '2024-06-13 17:49:18');
INSERT INTO `comment` VALUES ('9', '火3213131狐换股', '6', null, '8', '2024-06-13 17:49:32', '2024-06-13 17:49:32');
INSERT INTO `comment` VALUES ('10', '你就说吧对外部v大晚上', '8', null, '8', '2024-06-13 17:49:39', '2024-06-13 17:49:39');
INSERT INTO `comment` VALUES ('11', '回复评论的评论', '8', '10', '8', '2024-06-13 17:50:14', '2024-06-13 17:50:14');
INSERT INTO `comment` VALUES ('12', '回复评论的评论', '8', '10', '8', '2024-06-14 17:24:15', '2024-06-14 17:24:15');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(10) NOT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `flag` int DEFAULT (0),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES ('9', '吃瓜', '2024-06-14 10:19:40', '2024-06-14 10:19:40', '0');
INSERT INTO `label` VALUES ('10', '电影', '2024-06-14 14:27:37', '2024-06-14 14:27:37', '0');
INSERT INTO `label` VALUES ('11', '运动', '2024-06-14 14:27:42', '2024-06-14 14:27:42', '0');
INSERT INTO `label` VALUES ('12', '看书', '2024-06-14 14:27:47', '2024-06-14 14:27:47', '0');
INSERT INTO `label` VALUES ('13', '休闲', '2024-06-14 14:27:53', '2024-06-14 14:27:53', '0');
INSERT INTO `label` VALUES ('14', '健身', '2024-06-14 14:28:04', '2024-06-14 14:28:04', '0');
INSERT INTO `label` VALUES ('15', '吃瓜', '2024-06-14 15:46:48', '2024-06-14 15:46:48', '0');
INSERT INTO `label` VALUES ('16', '吃瓜', '2024-06-14 15:47:12', '2024-06-14 15:47:12', '0');
INSERT INTO `label` VALUES ('17', '新的测试标签', '2024-06-14 15:47:30', '2024-06-14 15:47:30', '0');
INSERT INTO `label` VALUES ('18', '新的测试标签002', '2024-06-14 15:49:37', '2024-06-14 15:49:37', '0');
INSERT INTO `label` VALUES ('19', '新的测试标签002', '2024-06-14 16:02:51', '2024-06-14 16:02:51', '0');
INSERT INTO `label` VALUES ('20', '新的测试标签002', '2024-06-14 16:03:07', '2024-06-14 16:03:07', '0');
INSERT INTO `label` VALUES ('21', '新的测试标签002', '2024-06-14 16:03:36', '2024-06-14 16:03:36', '0');
INSERT INTO `label` VALUES ('22', '新的测试标签002', '2024-06-14 16:04:11', '2024-06-14 16:04:11', '0');
INSERT INTO `label` VALUES ('23', '新的测试标签002', '2024-06-14 16:04:15', '2024-06-14 16:04:15', '0');
INSERT INTO `label` VALUES ('24', '32131', '2024-06-14 16:17:44', '2024-06-14 16:17:44', '0');
INSERT INTO `label` VALUES ('25', '33333', '2024-06-14 16:17:44', '2024-06-14 16:17:44', '0');
INSERT INTO `label` VALUES ('56', '新的测试标签002', '2024-06-14 16:55:16', '2024-06-14 16:55:16', '0');
INSERT INTO `label` VALUES ('57', '新的测试标签004', '2024-06-14 16:55:16', '2024-06-14 16:55:16', '0');
INSERT INTO `label` VALUES ('58', '新的测试标签002', '2024-06-14 17:23:58', '2024-06-14 17:23:58', '0');
INSERT INTO `label` VALUES ('59', '新的测试标签004', '2024-06-14 17:23:58', '2024-06-14 17:23:58', '0');
INSERT INTO `label` VALUES ('60', '321312', '2024-06-14 17:29:43', '2024-06-14 17:29:43', '0');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `user_id` int NOT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES ('5', 'haode ', '7', '2024-06-12 16:22:39', '2024-06-12 16:22:39');
INSERT INTO `moment` VALUES ('6', '123123', '7', '2024-06-12 16:23:27', '2024-06-13 14:43:35');
INSERT INTO `moment` VALUES ('7', 'mysql从入门到删库跑路', '7', '2024-06-12 16:24:06', '2024-06-12 16:24:06');
INSERT INTO `moment` VALUES ('8', '的hi哦哦地表温度我对我', '1', '2024-06-12 16:53:36', '2024-06-12 16:53:36');
INSERT INTO `moment` VALUES ('11', '的hi哦哦地表温度我对我', '1', '2024-06-12 17:16:41', '2024-06-12 17:16:41');
INSERT INTO `moment` VALUES ('12', '叫哦分别为部分我可没放不开今', '2', '2024-06-12 17:16:41', '2024-06-12 17:16:41');
INSERT INTO `moment` VALUES ('13', '才能到数控机床年级是的吧hi', '3', '2024-06-12 17:16:41', '2024-06-12 17:16:41');
INSERT INTO `moment` VALUES ('14', 'mysql从入门到删库跑路1111mysql从入门到删库跑路mysql从入门到删库跑路', '8', '2024-06-13 15:00:32', '2024-06-13 15:00:32');
INSERT INTO `moment` VALUES ('38', '发表动态测试001', '8', '2024-06-14 16:15:42', '2024-06-14 16:15:42');
INSERT INTO `moment` VALUES ('39', '发表动态测试001', '8', '2024-06-14 16:18:34', '2024-06-14 16:18:34');
INSERT INTO `moment` VALUES ('40', '发表动态测试001', '8', '2024-06-14 16:18:52', '2024-06-14 16:18:52');
INSERT INTO `moment` VALUES ('41', '发表动态测试001', '8', '2024-06-14 16:24:13', '2024-06-14 16:24:13');
INSERT INTO `moment` VALUES ('42', '发表动态测试001', '8', '2024-06-14 16:24:41', '2024-06-14 16:24:41');
INSERT INTO `moment` VALUES ('43', '发表动态测试001', '8', '2024-06-14 16:26:48', '2024-06-14 16:26:48');
INSERT INTO `moment` VALUES ('44', '发表动态测试001', '8', '2024-06-14 16:27:46', '2024-06-14 16:27:46');
INSERT INTO `moment` VALUES ('45', '发表动态测试001', '8', '2024-06-14 16:28:17', '2024-06-14 16:28:17');
INSERT INTO `moment` VALUES ('46', '发表动态测试001', '8', '2024-06-14 16:49:27', '2024-06-14 16:49:27');
INSERT INTO `moment` VALUES ('47', '发表动态测试001', '8', '2024-06-14 16:50:05', '2024-06-14 16:50:05');
INSERT INTO `moment` VALUES ('48', '发表动态测试001', '8', '2024-06-14 16:50:42', '2024-06-14 16:50:42');
INSERT INTO `moment` VALUES ('49', '发表动态测试001', '8', '2024-06-14 16:50:57', '2024-06-14 16:50:57');
INSERT INTO `moment` VALUES ('50', '发表动态测试001', '8', '2024-06-14 16:51:59', '2024-06-14 16:51:59');
INSERT INTO `moment` VALUES ('51', '发表动态测试001', '8', '2024-06-14 16:52:20', '2024-06-14 16:52:20');
INSERT INTO `moment` VALUES ('52', '发表动态测试001', '8', '2024-06-14 16:52:42', '2024-06-14 16:52:42');
INSERT INTO `moment` VALUES ('53', '发表动态测试001', '8', '2024-06-14 16:54:27', '2024-06-14 16:54:27');
INSERT INTO `moment` VALUES ('54', '发表动态测试001', '8', '2024-06-14 16:54:49', '2024-06-14 16:54:49');
INSERT INTO `moment` VALUES ('55', '发表动态测试001', '8', '2024-06-14 16:55:16', '2024-06-14 16:55:16');
INSERT INTO `moment` VALUES ('56', '发表动态测试001', '8', '2024-06-14 17:23:58', '2024-06-14 17:23:58');

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label` (
  `id` int NOT NULL AUTO_INCREMENT,
  `moment_id` int NOT NULL,
  `label_id` int NOT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `moment_id` (`moment_id`),
  KEY `label_id` (`label_id`),
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`),
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of moment_label
-- ----------------------------
INSERT INTO `moment_label` VALUES ('1', '55', '9', '2024-06-14 16:55:16', '2024-06-14 16:55:16');
INSERT INTO `moment_label` VALUES ('2', '55', '56', '2024-06-14 16:55:16', '2024-06-14 16:55:16');
INSERT INTO `moment_label` VALUES ('3', '55', '57', '2024-06-14 16:55:16', '2024-06-14 16:55:16');
INSERT INTO `moment_label` VALUES ('4', '56', '9', '2024-06-14 17:23:58', '2024-06-14 17:23:58');
INSERT INTO `moment_label` VALUES ('5', '56', '58', '2024-06-14 17:23:58', '2024-06-14 17:23:58');
INSERT INTO `moment_label` VALUES ('6', '56', '59', '2024-06-14 17:23:58', '2024-06-14 17:23:58');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'liuchang', '123456', '2024-06-11 10:31:33', '2024-06-11 10:31:33');
INSERT INTO `user` VALUES ('2', 'liuchang35', '123456', '2024-06-11 10:33:44', '2024-06-11 10:33:44');
INSERT INTO `user` VALUES ('3', 'xdjiang', '123456', '2024-06-11 10:34:36', '2024-06-11 10:34:36');
INSERT INTO `user` VALUES ('4', 'xdjiang111', '666666', '2024-06-11 15:25:29', '2024-06-11 15:25:29');
INSERT INTO `user` VALUES ('5', 'xdjiang222', '666666', '2024-06-11 15:26:42', '2024-06-11 15:26:42');
INSERT INTO `user` VALUES ('6', 'xdjiang333', '666666', '2024-06-11 15:27:17', '2024-06-11 15:27:17');
INSERT INTO `user` VALUES ('7', 'xdjiang444', 'f379eaf3c831b04de153469d1bec345e', '2024-06-11 15:39:14', '2024-06-11 15:39:14');
INSERT INTO `user` VALUES ('8', 'liuchang666', 'e10adc3949ba59abbe56e057f20f883e', '2024-06-13 14:52:41', '2024-06-13 14:52:41');
