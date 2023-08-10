-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: btce4
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `teacherName` varchar(255) NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `shortForm` varchar(255) NOT NULL,
  PRIMARY KEY (`shortForm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('SNA','Computer Organization and Architecture','COA'),('VLG','Complex Variables and Transforms','CVT'),('SNA','Microprocessor and Microcontroller LAB B1','MP1'),('KJO','Microprocessor and Microcontroller','MPM'),('VTH','Object Oriented Programming Using JAVA','OPJ'),('MTI','Theoretical Computer Science','TCS'),('VTH','Web Programming','WEB');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment` (
  `sapid` varchar(255) NOT NULL,
  `shortForm` varchar(255) NOT NULL,
  KEY `shortForm` (`shortForm`),
  CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`shortForm`) REFERENCES `courses` (`shortForm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
INSERT INTO `enrollment` VALUES ('70022100109','COA'),('70022100109','CVT'),('70022100101','COA'),('70022100109','TCS'),('70022100109','MPM'),('70022100109','MP1'),('70022100109','WEB'),('70022100109','OPJ'),('70022100101','CVT'),('70022100101','TCS'),('70022100101','MPM'),('70022100101','MP1'),('70022100101','WEB'),('70022100101','OPJ'),('70022100103','COA'),('70022100340','COA'),('70022100342','COA'),('70022100344','COA'),('70022100103','MP1'),('70022100340','MP1'),('70022100342','MP1'),('70022100344','MP1');
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lectures` (
  `teacherName` varchar(255) NOT NULL,
  `shortForm` varchar(255) NOT NULL,
  `datee` varchar(25) NOT NULL,
  `startTime` varchar(10) NOT NULL,
  `marked` varchar(1) DEFAULT 'F',
  KEY `shortForm` (`shortForm`),
  CONSTRAINT `lectures_ibfk_1` FOREIGN KEY (`shortForm`) REFERENCES `courses` (`shortForm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectures`
--

LOCK TABLES `lectures` WRITE;
/*!40000 ALTER TABLE `lectures` DISABLE KEYS */;
INSERT INTO `lectures` VALUES ('SNA','COA','2023-03-15','14:00','F'),('SNA','COA','2023-03-29','14:00','F'),('SNA','COA','2023-04-01','14:00','T'),('SNA','COA','2023-04-01','15:00','T'),('SNA','COA','2023-04-01','09:00','T'),('SNA','COA','2023-04-03','09:00','F'),('SNA','COA','2023-04-04','09:00','T'),('SNA','COA','2023-04-05','9:00','T'),('SNA','MP1','2023-04-05','14:00','T'),('SNA','MP1','2023-04-05','15:00','F'),('SNA','MP1','2023-03-14','14:00','F'),('SNA','MP1','2023-03-14','15:00','F'),('MTI','TCS','2023-03-14','9:00','F'),('SNA','COA','2023-04-09','9:00','T');
/*!40000 ALTER TABLE `lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `names`
--

DROP TABLE IF EXISTS `names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `names` (
  `name` varchar(255) NOT NULL,
  `sapid` varchar(255) NOT NULL,
  `rollno` varchar(255) NOT NULL,
  PRIMARY KEY (`sapid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `names`
--

LOCK TABLES `names` WRITE;
/*!40000 ALTER TABLE `names` DISABLE KEYS */;
INSERT INTO `names` VALUES ('Raj Hariya','70022100101','B019'),('Parth Lele','70022100103','B034'),('Aryan Jotwani','70022100109','B028'),('Ritam Dattaray','70022100340','B011'),('Rajdeep Guha','70022100342','B017'),('Vedant Heda','70022100344','B020');
/*!40000 ALTER TABLE `names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `records`
--

DROP TABLE IF EXISTS `records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `records` (
  `sapid` varchar(255) NOT NULL,
  `teacherName` varchar(255) NOT NULL,
  `shortForm` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'A',
  `datee` varchar(25) NOT NULL,
  `startTime` varchar(10) NOT NULL,
  KEY `shortForm` (`shortForm`),
  CONSTRAINT `records_ibfk_1` FOREIGN KEY (`shortForm`) REFERENCES `courses` (`shortForm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `records`
--

LOCK TABLES `records` WRITE;
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
INSERT INTO `records` VALUES ('70022100109','SNA','COA','P','2023-03-15','14:00'),('70022100109','SNA','COA','P','2023-03-15','15:00'),('70022100109','SNA','COA','P','2023-02-16','09:00'),('70022100109','SNA','COA','A','2023-02-16','09:00'),('70022100109','SNA','COA','A','2023-01-23','09:00'),('70022100109','VLG','CVT','A','2023-01-01','10:00'),('70022100101','SNA','COA','P','2023-03-15','14:00'),('70022100101','SNA','COA','P','2023-04-01','14:00'),('70022100109','SNA','COA','A','2023-04-01','14:00'),('70022100101','SNA','COA','P','2023-04-01','15:00'),('70022100109','SNA','COA','P','2023-04-01','15:00'),('70022100101','SNA','COA','A','2023-04-01','09:00'),('70022100109','SNA','COA','A','2023-04-01','09:00'),('70022100101','SNA','COA','P','2023-04-04','09:00'),('70022100109','SNA','COA','P','2023-04-04','09:00'),('70022100109','VLG','CVT','P','2023-02-02','14:00'),('70022100109','VLG','CVT','P','2023-02-09','14:00'),('70022100109','VLG','CVT','P','2023-02-16','14:00'),('70022100109','VLG','CVT','P','2023-02-23','14:00'),('70022100109','MTI','TCS','P','2023-02-23','9:00'),('70022100109','MTI','TCS','P','2023-02-30','9:00'),('70022100109','MTI','TCS','P','2023-02-16','9:00'),('70022100109','MTI','TCS','A','2023-02-09','9:00'),('70022100109','MTI','TCS','A','2023-02-02','9:00'),('70022100109','VTH','OPJ','P','2023-02-04','10:00'),('70022100109','VTH','WEB','P','2023-02-05','14:00'),('70022100109','VTH','OPJ','P','2023-02-04','11:00'),('70022100109','VTH','WEB','P','2023-02-05','15:00'),('70022100109','KJO','MPM','P','2023-02-05','16:00'),('70022100109','KJO','MPM','P','2023-02-12','16:00'),('70022100109','KJO','MPM','P','2023-02-19','16:00'),('70022100109','SNA','MP1','A','2023-02-06','10:00'),('70022100109','SNA','MP1','A','2023-02-13','11:00'),('70022100109','SNA','COA','P','2023-04-05','9:00'),('70022100101','SNA','COA','P','2023-04-05','9:00'),('70022100103','SNA','COA','P','2023-04-05','9:00'),('70022100340','SNA','COA','P','2023-04-05','9:00'),('70022100342','SNA','COA','P','2023-04-05','9:00'),('70022100344','SNA','COA','P','2023-04-05','9:00'),('70022100109','SNA','MP1','P','2023-04-05','14:00'),('70022100101','SNA','MP1','P','2023-04-05','14:00'),('70022100103','SNA','MP1','P','2023-04-05','14:00'),('70022100340','SNA','MP1','P','2023-04-05','14:00'),('70022100342','SNA','MP1','P','2023-04-05','14:00'),('70022100344','SNA','MP1','P','2023-04-05','14:00'),('70022100109','SNA','COA','P','2023-04-09','9:00'),('70022100101','SNA','COA','P','2023-04-09','9:00'),('70022100103','SNA','COA','P','2023-04-09','9:00'),('70022100340','SNA','COA','P','2023-04-09','9:00'),('70022100342','SNA','COA','P','2023-04-09','9:00'),('70022100344','SNA','COA','A','2023-04-09','9:00');
/*!40000 ALTER TABLE `records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `sapid` varchar(255) NOT NULL,
  `teacherName` varchar(255) NOT NULL,
  `shortForm` varchar(255) NOT NULL,
  KEY `shortForm` (`shortForm`),
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`shortForm`) REFERENCES `courses` (`shortForm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES ('70022100110','SNA','COA'),('70022100111','VLG','CVT'),('70022100110','SNA','MP1'),('70022100112','KJO','MPM'),('70022100113','MTI','TCS'),('70022100114','VTH','WEB'),('70022100115','VTH','OPJ');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-10 23:30:47
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: nodelogin
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `sapid` bigint NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  PRIMARY KEY (`sapid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (70022100101,'$2b$10$xXW2MEWqxs2d8Elhr4xR4uh41r9EaEgZKBNvvYHpCGZmGLw5ceRY2','S','Raj Hariya','btce4'),(70022100103,'$2b$10$xXW2MEWqxs2d8Elhr4xR4uh41r9EaEgZKBNvvYHpCGZmGLw5ceRY2','S','Parth Lele','btce4'),(70022100109,'$2b$10$xXW2MEWqxs2d8Elhr4xR4uh41r9EaEgZKBNvvYHpCGZmGLw5ceRY2','S','Aryan Jotwani','btce4'),(70022100110,'$2b$10$xXW2MEWqxs2d8Elhr4xR4uh41r9EaEgZKBNvvYHpCGZmGLw5ceRY2','T','Sumita Nainan',''),(70022100340,'$2b$10$xXW2MEWqxs2d8Elhr4xR4uh41r9EaEgZKBNvvYHpCGZmGLw5ceRY2','S','Ritam Dattaray','btce4'),(70022100342,'$2b$10$xXW2MEWqxs2d8Elhr4xR4uh41r9EaEgZKBNvvYHpCGZmGLw5ceRY2','S','Rajdeep Guha','btce4'),(70022100344,'$2b$10$xXW2MEWqxs2d8Elhr4xR4uh41r9EaEgZKBNvvYHpCGZmGLw5ceRY2','S','Vedant Heda','btce4');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branchnames`
--

DROP TABLE IF EXISTS `branchnames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branchnames` (
  `branchShortForm` varchar(5) NOT NULL,
  `branchFullForm` varchar(255) NOT NULL,
  `semesterNumber` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchnames`
--

LOCK TABLES `branchnames` WRITE;
/*!40000 ALTER TABLE `branchnames` DISABLE KEYS */;
INSERT INTO `branchnames` VALUES ('btce4','BTECH COMPUTER ENGINEERING',4),('btme6','BTECH MECHANICAL ENGINEERING',6),('mbce4','MBA TECH COMPUTER ENGINEERING',4);
/*!40000 ALTER TABLE `branchnames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `sapid` bigint NOT NULL,
  `branchShortForm` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (70022100110,'btce4'),(70022100110,'btme6'),(70022100110,'mbce4');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-10 23:30:47
