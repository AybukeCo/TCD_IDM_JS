-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 28, 2024 at 12:06 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myprojectgroup`
--

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `class_module` text NOT NULL,
  `student_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`class_module`, `student_id`, `role_id`) VALUES
('CS7043', 23350017, 1),
('CS7043', 23350025, 3),
('CS7043', 23350036, 1),
('CS7043', 23350043, 2),
('CS7043', 23350058, 2);

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `student_id` int(11) NOT NULL,
  `sudent_first_name` text NOT NULL,
  `student_last_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`student_id`, `sudent_first_name`, `student_last_name`) VALUES
(23350017, 'Aybuke', 'Colak'),
(23350025, 'Alana', 'Prnjavorac'),
(23350036, 'Damian', 'Nowakowski'),
(23350043, 'Diane', 'Chounlamountry'),
(23350058, 'Emilio', 'Pavon');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Game Developer'),
(2, 'Game Designer'),
(3, 'Game Audio');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);
COMMIT;

UPDATE `module` SET `class_module`='CS7044' WHERE `class_module`='CS7043';

SELECT * FROM module 
JOIN people ON module.student_id=people.student_id 
JOIN roles ON module.role_id=roles.role_id;

SELECT * FROM `module` WHERE SELECT roles.role_id, roles.role_name, COUNT(*) as NUMBEROFSTUDENTS 
FROM `module` 
JOIN `people` ON `module`.`student_id` = `people`.`student_id`
JOIN `roles` ON `module`.`role_id` = `roles`.`role_id`
GROUP BY `module`.`role_id`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
