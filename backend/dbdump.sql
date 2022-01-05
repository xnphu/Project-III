-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: library_management
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES ('22010001','Melissa Merz',NULL),('22010002','Stephen E. Lucas','Stephen E. Lucas is Professor of Communication Arts and Evjue-Bascom Professor in the Humanities at the University of Wisconsin-Madison, where he has taught since 1972. He received his bachelor\'s degree from the University of California, Santa Barbara, and his master\'s and doctorate degrees from Penn State University.');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_lending`
--

DROP TABLE IF EXISTS `book_lending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_lending` (
  `id` varchar(45) NOT NULL,
  `book_id` varchar(45) NOT NULL,
  `due_date` datetime NOT NULL,
  `return_date` varchar(45) NOT NULL,
  `fine_amount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_lending_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_lending`
--

LOCK TABLES `book_lending` WRITE;
/*!40000 ALTER TABLE `book_lending` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_lending` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_reservation`
--

DROP TABLE IF EXISTS `book_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_reservation` (
  `id` varchar(45) NOT NULL,
  `book_id` varchar(45) NOT NULL,
  `status` int NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_reservation_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_reservation`
--

LOCK TABLES `book_reservation` WRITE;
/*!40000 ALTER TABLE `book_reservation` DISABLE KEYS */;
INSERT INTO `book_reservation` VALUES ('22010001','22010001',0,'2022-01-01 00:00:00');
/*!40000 ALTER TABLE `book_reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` varchar(45) NOT NULL,
  `author_id` varchar(45) NOT NULL,
  `rack_id` varchar(45) NOT NULL,
  `isbn` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `subject` varchar(45) NOT NULL,
  `publisher` varchar(45) NOT NULL,
  `publish_date` datetime NOT NULL,
  `date_purchase` datetime DEFAULT NULL,
  `language` varchar(45) NOT NULL,
  `number_of_pages` int NOT NULL,
  `previewUrl` varchar(1000) DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `author_id` (`author_id`),
  KEY `rack_id` (`rack_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`),
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`rack_id`) REFERENCES `rack` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES ('22010001','22010001','22010001','9781138828414',100,'The Art and Practice of Costume Design','In The Art and Practice of Costume Design, a panel of seven designers offer a new multi-sided look at the current state and practice of theatrical costume design. Beginning with an exploration of the role of a Costume Designer, the subsequent chapters analyse and explore the psychology of dress, the principles and elements of design, how to create costume renderings, and collaboration within the production. The book also takes a look at the costume shop and the role of the designer within it, and costume design careers within theatrical and fashion industries.','Psychology','Routledge, Taylor & Francis Group','2017-01-01 00:00:00','2021-01-01 00:00:00','English',293,'https://cft.findbook.tw/image/book/9781138828414/large',0),('2210002','22010002','22010001','007313564X',200,'The Art of Public Speaking, Part 3','Whether a novice or an experienced speaker, every student will learn how to be a better public speaker through Lucas\' clear explanations and thorough coverage. By far the leading speech textbook of our time, The Art of Public Speaking has defined the art of being the best for more than six million students and instructors. The Lucas Learning Tools Suite offers even more tools and study options to fit the active lifestyles and diverse learning/teaching styles of today\'s students and instructors.','Public speaking','McGraw-Hill, 2007','2007-01-01 00:00:00','2021-02-01 00:00:00','English',506,'https://cft.findbook.tw/image/book/007313564X/large',0),('2210007','22010001','22010002','007313564X434',200,'The Art of Public Speaking, Part 3','Whether a novice or an experienced speaker, every student will learn how to be a better public speaker through Lucas\' clear explanations and thorough coverage. By far the leading speech textbook of our time, The Art of Public Speaking has defined the art of being the best for more than six million students and instructors. The Lucas Learning Tools Suite offers even more tools and study options to fit the active lifestyles and diverse learning/teaching styles of today\'s students and instructors.','Public speaking','McGraw-Hill, 2007','2007-01-01 00:00:00','2021-02-01 00:00:00','English',506,'https://cft.findbook.tw/image/book/007313564X434/large',0),('2210011','22010001','22010001','1231231',3123,'qweqw','sadadad','asdasd','qweqweqw','2022-01-05 00:00:00','2021-08-06 00:00:00','English',123,'https://cft.findbook.tw/image/book/1231231/large',0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` varchar(45) NOT NULL,
  `member_id` varchar(45) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `answer` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library_card`
--

DROP TABLE IF EXISTS `library_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library_card` (
  `id` varchar(45) NOT NULL,
  `member_id` varchar(45) NOT NULL,
  `issue_date` varchar(45) NOT NULL,
  `active_flg` int NOT NULL,
  KEY `member_id` (`member_id`),
  CONSTRAINT `library_card_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library_card`
--

LOCK TABLES `library_card` WRITE;
/*!40000 ALTER TABLE `library_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `library_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('00205e4f-3663-46e2-8dc0-376677466bf1','librarian1','$2b$12$zSg/80IEGQdxFfHEXIPc..hLBeNWRJzxQngidY.KA9xW872zYYeya',1),('21120001','librarian2','$2b$12$RkkSj9YHWPLv0bO1CnwtweC9zjr3xCeZ/z3JtM/cN4IAjXVDIpXUO',1),('21120002','librarian3','$2b$12$tgCbXQJiAhyTgJ6RD6M93OmSHiHUBZhijuB0hUnVrlptohcAzDUAu',1),('21120003','user1','$2b$12$szMFnMKmzLg0JJ3B2tNfN.KZyzeJ8dET2sF4ktqawRElvUyXMK9jq',2),('21120004','phu','$2b$12$jVcDv4lz5xd.cm199BdFVeyjf.rOoMS6T0rQ4K1K6qrrNhiBU4CyW',2),('21120005','phu1','$2b$12$JlrLIIqrywuMzqja6WDh3umqHOpv4EgCcwdpntptwsDaPzsP122H2',2),('21120006','phu2','$2b$12$fyoSccBTShLwKoKw4obg3eks7ETQi9SzzzWd6/8ln1D2BnOrW62v6',2),('21120007','phu3','$2b$12$vmveTec89Vltzz0aLTZCt.Ck1GzVp.gxzbBuw.0O/HKq8w0pZNj0S',2),('21120008','phu4','$2b$12$HdycSD2HNevzxR9oCQmjNeGgBX4J9jXizNRq.O499JL2HKE88.zVO',2),('e7f5bc6b-ad05-4a2f-8085-86c11aea956b','admin','$2b$12$gLUfkvf27PnB3QgVvrJAmeN1qdmRMJXH4fx8gGJN9r8LGxtQLvmOq',0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_info`
--

DROP TABLE IF EXISTS `member_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_info` (
  `id` varchar(45) NOT NULL,
  `student_id` varchar(45) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `sex` int NOT NULL,
  `date_of_birth` date NOT NULL,
  `street` varchar(1000) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `member_info_ibfk_1` FOREIGN KEY (`id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_info`
--

LOCK TABLES `member_info` WRITE;
/*!40000 ALTER TABLE `member_info` DISABLE KEYS */;
INSERT INTO `member_info` VALUES ('21120005','20168411','Nguyễn Xuân Phú','phunx@gmail.com','0123456789',1,'1998-01-01','Đống Đa','Hà Nội','Việt Nam',1),('21120008','20160001','Nguyễn Xuân Phú','phunx@gmail.com','0123456789',1,'1998-01-01','Đống Đa','Hà Nội','Việt Nam',1),('e7f5bc6b-ad05-4a2f-8085-86c11aea956b','','Nguyễn Xuân Phú','admin@gmail.com','0123456789',1,'1988-01-01','Đống Đa','Hà Nội','Việt Nam',1);
/*!40000 ALTER TABLE `member_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rack`
--

DROP TABLE IF EXISTS `rack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rack` (
  `id` varchar(45) NOT NULL,
  `number` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rack`
--

LOCK TABLES `rack` WRITE;
/*!40000 ALTER TABLE `rack` DISABLE KEYS */;
INSERT INTO `rack` VALUES ('22010001',101),('22010002',102),('22010003',103);
/*!40000 ALTER TABLE `rack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serial_number`
--

DROP TABLE IF EXISTS `serial_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serial_number` (
  `id` int NOT NULL,
  `type` int NOT NULL,
  `type_name` varchar(45) NOT NULL,
  `current_value` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serial_number`
--

LOCK TABLES `serial_number` WRITE;
/*!40000 ALTER TABLE `serial_number` DISABLE KEYS */;
INSERT INTO `serial_number` VALUES (1,1,'member',8),(2,2,'book',11),(3,3,'author',1);
/*!40000 ALTER TABLE `serial_number` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-05 16:18:17
