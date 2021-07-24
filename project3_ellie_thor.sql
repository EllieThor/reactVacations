-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2021 at 11:27 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project3_ellie_thor`
--

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `FollowID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vacationID` int(11) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`FollowID`, `createdAt`, `updatedAt`, `vacationID`, `userID`) VALUES
(72, '2021-06-25 15:54:22', '2021-06-25 15:54:22', 55, 2),
(75, '2021-06-25 15:54:43', '2021-06-25 15:54:43', 106, 3),
(81, '2021-06-25 17:57:02', '2021-06-25 17:57:02', 106, 2),
(82, '2021-06-25 17:57:11', '2021-06-25 17:57:11', 47, 2),
(92, '2021-06-29 10:27:13', '2021-06-29 10:27:13', 46, 21),
(93, '2021-06-29 10:27:40', '2021-06-29 10:27:40', 1, 21),
(94, '2021-06-29 10:27:44', '2021-06-29 10:27:44', 33, 21),
(96, '2021-06-29 10:28:32', '2021-06-29 10:28:32', 55, 21),
(100, '2021-07-22 20:31:30', '2021-07-22 20:31:30', 33, 3),
(101, '2021-07-23 19:04:11', '2021-07-23 19:04:11', 46, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` int(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `FirstName`, `LastName`, `Email`, `Password`, `Role`, `createdAt`, `updatedAt`) VALUES
(1, 'Sarah', 'Manning', 'zoe@gmail.com', '1111', 1, '2021-05-17 08:53:03', '2021-05-17 08:53:03'),
(2, 'Alison ', 'Hendrix', 'champy@gmail.com', '2222', 0, '2021-05-17 08:54:34', '2021-05-17 08:54:34'),
(3, 'Cosima ', 'Niehaus', 'alex@gmail.com', '3333', 0, '2021-05-17 08:55:10', '2021-05-17 08:55:10'),
(21, 'Rachel ', 'Duncan ', 'mika@gmail.com', '4444', 0, '2021-05-19 15:57:11', '2021-05-19 15:57:11'),
(59, 'אלי', 'tt', 'asdfg@ddd.ff', '8888', 0, '2021-06-16 15:36:04', '2021-06-16 15:36:04'),
(61, 'sdf', 'dfg', 'zoe2@gmail.com', '1111', 0, '2021-06-17 09:43:22', '2021-06-17 09:43:22'),
(62, 'sdfg', 'sdf', 'zoe4@gmail.com', '1111', 0, '2021-06-17 09:43:37', '2021-06-17 09:43:37'),
(63, 'fghj', 'dfgh', 'zoe5@gmail.com', '1111', 0, '2021-06-17 09:58:25', '2021-06-17 09:58:25'),
(68, 'asdf', 'g', 'zoes@gmail.com', '1111', 0, '2021-06-17 10:08:56', '2021-06-17 10:08:56'),
(71, 's', 's', 'zoeeeee@gmail.com', '1111', 0, '2021-06-17 10:10:03', '2021-06-17 10:10:03'),
(73, 'sdrf', 'erty', 'zoerrrr@gmail.com', '1111', 0, '2021-06-17 10:25:42', '2021-06-17 10:25:42'),
(74, 'sdf', 'ss', 'zoeuu@gmail.com', '1111', 0, '2021-06-22 08:41:55', '2021-06-22 08:41:55'),
(75, 'tt', 'tt', 'zoettt@gmail.com', '1111', 0, '2021-06-22 08:42:52', '2021-06-22 08:42:52'),
(76, 'sdf', 'asd', 'zoessss@gmail.com', '1111', 0, '2021-06-22 10:16:46', '2021-06-22 10:16:46'),
(77, 'sdfg', 'jjj', 'zoekjhg@gmail.com', '1111', 0, '2021-06-22 10:48:29', '2021-06-22 10:48:29'),
(78, '5', '5', 'z45oe@gmail.com', '1111', 0, '2021-06-22 10:50:47', '2021-06-22 10:50:47'),
(79, 'אלי', 'ddd', 'zoet@gmail.com', '1111', 0, '2021-06-22 12:49:05', '2021-06-22 12:49:05'),
(81, '55', '88', 'zoooe@gmail.com', '99', 0, '2021-06-23 13:26:24', '2021-06-23 13:26:24'),
(82, 'df', 'df', 'zjjjjjjoe@gmail.com', '1111', 0, '2021-06-26 15:32:46', '2021-06-26 15:32:46'),
(83, 'ee', 'ee', 'ee@gmail.com', 'ee', 0, '2021-07-11 11:30:50', '2021-07-11 11:30:50'),
(87, 'dse', 'sdfg', 'tt@gmail.com', '2222', 0, '2021-07-11 12:17:21', '2021-07-11 12:17:21'),
(92, 'maya', 'Thor‬‏', 'champgggy@gmail.com', '2222', 0, '2021-07-11 12:30:33', '2021-07-11 12:30:33'),
(94, 'ss', 'ss', 'zssssoe@gmail.com', '1111', 0, '2021-07-17 16:39:20', '2021-07-17 16:39:20'),
(95, 'אלי', 'sdfg', 'zoe@gmail.coxsm', '1111', 0, '2021-07-17 17:20:43', '2021-07-17 17:20:43'),
(97, 'a', 'zoe@gmail.com', 'aaa', '1111', 0, '2021-07-17 17:53:00', '2021-07-17 17:53:00'),
(99, 'sdfs', 'sds', 'zoe@gmail.cssssom', '1111', 0, '2021-07-17 19:05:38', '2021-07-17 19:05:38'),
(100, 'drtyu', 'sedrt', 'zoe@gmail.sdfghcom', '1111', 0, '2021-07-17 19:08:12', '2021-07-17 19:08:12'),
(101, 'ccc', 'ccc', 'ccc@gmail.com', 'ccc', 0, '2021-07-22 14:47:45', '2021-07-22 14:47:45'),
(103, 'sdf', 'sdf', 'zoess@gmail.com', '1111', 0, '2021-07-22 18:03:48', '2021-07-22 18:03:48'),
(104, 'sdf', 'asdf', 'zosdfe@gmail.com', '1111', 0, '2021-07-22 18:14:18', '2021-07-22 18:14:18');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `ID` int(11) NOT NULL,
  `Destination` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `ImageName` varchar(255) DEFAULT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`ID`, `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`, `createdAt`, `updatedAt`) VALUES
(1, 'Paris', 'A holiday in the City of Lights in Paris, an evening visit on the Champs Elysees, a cruise on the San, a guided tour of the Notre Dame de Paris Cathedral and lots of other museums, restaurants and spectacular cultural events.', 499, 'paris.png', '2021-05-23', '2021-05-23', '2021-05-16 20:12:48', '2021-07-23 15:45:29'),
(33, 'Brazil', 'A trip from coast to coast in a sunny country full of mystery', 1000, 'brasil.png', '2021-06-01', '2021-06-03', '2021-05-17 16:38:02', '2021-07-23 21:25:15'),
(46, ' japan', 'A group trip in western Japan, three weeks of nature and spectacular scenery, A peek into the world and other culture, recommended for seniors! An accessible trip.', 250, 'japan.png', '2021-07-02', '2021-07-07', '2021-05-17 19:41:51', '2021-07-23 15:33:14'),
(47, 'Cyprus', 'A family trip, an unforgettable experience for children with activities and declared beaches and especially quiet for parents in private pools, a glass of wine and magical sunsets.', 205, 'cyprus.png', '2021-06-09', '2021-06-22', '2021-05-18 13:19:13', '2021-07-23 15:26:59'),
(55, 'Denmark', 'Come and be charmed by Copenhagen, Northern Europe’s cosiest capital, packed with cafés, shops, and the best restaurants in Scandinavia.', 1000, 'denmark.png', '2021-07-05', '2021-07-11', '2021-05-22 20:13:51', '2021-07-21 15:53:21'),
(106, 'Switzerland', 'Ski trip at the foot of Mount Mont Blanc', 500, 'montBlanc.png', '2021-08-27', '2021-05-27', '2021-05-23 20:21:46', '2021-07-23 21:17:01'),
(165, 'kenya', 'Backpacking trip in the savannah of Kenya. A trip among wild animals, spectacular nature and a few days in which you will experience happiness and joy among the elephants and giraffes, a trip recommended in the fall', 650, 'savannah.png', '2021-07-09', '2021-07-18', '2021-07-23 17:55:40', '2021-07-23 18:02:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`FollowID`),
  ADD KEY `vacationID` (`vacationID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follows`
--
ALTER TABLE `follows`
  MODIFY `FollowID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
