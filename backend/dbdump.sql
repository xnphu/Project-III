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
INSERT INTO `author` VALUES ('22010001','Melissa Merz',NULL),('22010002','Stephen E. Lucas','Stephen E. Lucas is Professor of Communication Arts and Evjue-Bascom Professor in the Humanities at the University of Wisconsin-Madison, where he has taught since 1972. He received his bachelor\'s degree from the University of California, Santa Barbara, and his master\'s and doctorate degrees from Penn State University.'),('22010003','F. Richard Yu','F. Richard Yu received the PhD degree in electrical engineering from the University of British Columbia (UBC) in 2003. From 2002 to 2004, he was with Ericsson (in Lund, Sweden), where he worked on the research and development of wireless mobile systems. From 2005 to 2006, he was with a start-up in California, USA, where he worked on research and development in the areas of advanced wireless communication technologies and new standards. He joined Carleton School of Information Technology and the Department of Systems and Computer Engineering at Carleton University in 2007, where he is currently an Associate Professor. He received the IEEE Outstanding Leadership Award in 2013, Carleton Research Achievement Award in 2012, the Ontario Early Researcher Award (formerly Premier\'s Research Excellence Award) in 2011, the Excellent Contribution Award at IEEE/IFIP TrustCom 2010, the Leadership Opportunity Fund Award from Canada Foundation of Innovation in 2009, and the Best Paper Awards at IEEE Globecom 2012, IEEE/IFIP TrustCom 2009, and Int\'l Conference on Networking 2005. He serves on the editorial boards of several journals, including Co-Editor-in-Chief for Ad Hoc & Sensor Wireless Networks, Lead Series Editor for IEEE Transactions on Vehicular Technology - Connected Vehicles Series, Editor for IEEE Journal on Selected Areas in Communications (JSAC) - Series on Green Communications and Networking, and IEEE Communications Surveys & Tutorials.'),('22010004','Michael Roland',NULL),('22010005','Debashis De','Dr. Debashis De is the head of and associate professor in the Department of Computer Science and Engineering at West Bengal University of Technology, and an adjunct research fellow at the University of Western Australia. He is a senior member of the IEEE and member of the International Union of Radio Science. Dr. De is the author of more than 60 articles in peer-reviewed international journals, 50 conference papers, two research monographs, and 10 books. His research interests include location and handoff management, mobile cloud computing, traffic forecasting, green mobile networks, and low-power nanodevice designing for mobile applications. He earned a PhD in engineering from Jadavpur University.'),('22010014','A','B'),('22010015','C','D'),('22010016','E','F'),('2210006','Asoke K Talukder','Asoke K. Talukder has been with the IT industry for about 25 years. He has held senior positions in different technology companies in India and abroad. In his last industry association, he was the founder-CTO of Cellnext, the pioneering wireless technology company in India offering technology and solutions in the domain of GSM, GPRS, SMS, MMS, Intelligent Networks, CDMA, and 3G. Since January 2003, he has been with the Indian Institute of Information Technology, Bangalore and is currently the DaimlerChrysler Chair and Associate Professor at IIITB. Asoke has worked in the USA, UK, Singapore, and India for companies like Microsoft, Oracle, Informix, Sequoia, NEC, Fujitsu-ICIM, Digital, iGate, Blue Star Infotech, ICL to name a few. A postgraduate in Physics from the University of Calcutta (1976), he set up the first X.25 network in India for the Department of Telecommunications way back in 1986. Later, he set up the first Java Centre in India in 1998. He was a key engineer for Oracle Parallel Server for Hewlett-Packard HP-FX fault tolerant computers as well as for the 64 bit Informix for DEC Alpha.'),('2210007','Curt White','Curt M. White is an associate professor in the College of Computing and Digital Media at DePaul University, where he has been since 1988. Currently in his 37th year of teaching, he previously taught at Wayne State University, Illinois State University, Purdue University-Fort Wayne, and Dominican University. Dr. White has published more than 30 articles on computer science and computer science education, two chapters in books, and two college textbooks. In 1997, he chaired the ACM SIGCSE\'s national conference on computer science education and more recently served as president of the Consortium for Computing Sciences in Colleges. He completed a bachelor\'s, master\'s, and Ph.D. in computer science from Wayne State University.'),('2210008','Yonghui Wu','Yonghui Wu was the coach of Fudan University programming contest teams from 2001 to 2011. Under his guidance, Fudan University qualified for the Association for Computing Machinery International Collegiate Programming Contest (ACM-ICPC) World Finals every year, winning three medals during that span: the bronze medal in 2002, silver medal in 2005, and bronze medal in 2010. Since 2012, he has published a series of books for programming contests and education. He is now the chair of the ICPC Asia Programming Contest 1st Training Committee.'),('2210009','Foster Provost','Foster Provost is Professor and NEC Faculty Fellow at the NYU Stern School of Business, where he teaches in the MBA, Business Analytics, and Data Science programs. Former Editor-in-Chief for the journal Machine Learning, Professor Provost has co-founded several successful companies focusing on data science for marketing.'),('2210010','Michelle Malcher','Michelle Malcher, Oracle ACE, is a senior database administrator with more than 11 years’ experience in database development, design, and administration. She is a contributing author to Oracle Database 11g: A Beginner’s Guide and to the IOUG Best Practices Tip Booklet. Michelle is on the Board of the Independent Oracle User Group (IOUG).');
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
  `member_id` varchar(45) NOT NULL,
  `create_date` datetime NOT NULL,
  `due_date` datetime NOT NULL,
  `return_date` datetime DEFAULT NULL,
  `fine_amount` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `book_lending_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `book_lending_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_lending`
--

LOCK TABLES `book_lending` WRITE;
/*!40000 ALTER TABLE `book_lending` DISABLE KEYS */;
INSERT INTO `book_lending` VALUES ('22030007','22010001','e7f5bc6b-ad05-4a2f-8085-86c11aea956b','2022-02-28 00:00:00','2022-02-28 00:00:00','2022-03-18 00:00:00',15,1),('22030008','22010001','e7f5bc6b-ad05-4a2f-8085-86c11aea956b','2022-03-01 01:41:00','2022-03-12 00:00:00','2022-03-26 00:00:00',10,3),('22030013','22010001','e7f5bc6b-ad05-4a2f-8085-86c11aea956b','2022-03-01 01:51:00','2022-03-10 00:00:00',NULL,0,1),('22030016','2210012','22020014','2022-03-01 02:08:00','2022-03-11 00:00:00',NULL,0,1),('22030017','22010001','21120005','2022-03-04 15:14:00','2022-03-12 00:00:00','2022-03-09 00:00:00',0,2);
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
  `member_id` varchar(45) NOT NULL,
  `status` int NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `book_reservation_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `book_reservation_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_reservation`
--

LOCK TABLES `book_reservation` WRITE;
/*!40000 ALTER TABLE `book_reservation` DISABLE KEYS */;
INSERT INTO `book_reservation` VALUES ('22010001','22010001','e7f5bc6b-ad05-4a2f-8085-86c11aea956b',3,'2022-01-11 14:01:00'),('22010002','2210002','e7f5bc6b-ad05-4a2f-8085-86c11aea956b',3,'2022-01-14 10:32:00'),('22010008','2210002','21120005',3,'2022-01-19 15:56:00'),('22010009','22010001','21120005',5,'2022-01-19 17:11:00'),('22020010','2210007','e7f5bc6b-ad05-4a2f-8085-86c11aea956b',3,'2022-02-10 09:40:00'),('22020011','2210012','22020014',5,'2022-02-26 02:14:00');
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
  `title` varchar(200) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `subject` varchar(45) NOT NULL,
  `publisher` varchar(45) NOT NULL,
  `publish_date` datetime NOT NULL,
  `date_purchase` datetime DEFAULT NULL,
  `language` varchar(45) NOT NULL,
  `number_of_pages` int NOT NULL,
  `previewUrl` varchar(1000) DEFAULT NULL,
  `status` int NOT NULL,
  `total` int NOT NULL,
  `remain` int NOT NULL,
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
INSERT INTO `books` VALUES ('22010001','22010001','22010001','9781138828414',100,'The Art and Practice of Costume Design','In The Art and Practice of Costume Design, a panel of seven designers offer a new multi-sided look at the current state and practice of theatrical costume design. Beginning with an exploration of the role of a Costume Designer, the subsequent chapters analyse and explore the psychology of dress, the principles and elements of design, how to create costume renderings, and collaboration within the production. The book also takes a look at the costume shop and the role of the designer within it, and costume design careers within theatrical and fashion industries.','Psychology','Routledge, Taylor & Francis Group','2017-01-01 00:00:00','2021-01-01 00:00:00','English',293,'https://cft.findbook.tw/image/book/9781138828414/large',2,5,0),('2210002','22010002','22010001','007313564X',200,'The Art of Public Speaking, Part 3','Whether a novice or an experienced speaker, every student will learn how to be a better public speaker through Lucas\' clear explanations and thorough coverage. By far the leading speech textbook of our time, The Art of Public Speaking has defined the art of being the best for more than six million students and instructors. The Lucas Learning Tools Suite offers even more tools and study options to fit the active lifestyles and diverse learning/teaching styles of today\'s students and instructors.','Public speaking','McGraw-Hill, 2007','2007-01-01 00:00:00','2021-02-01 00:00:00','English',506,'https://cft.findbook.tw/image/book/007313564X/large',1,5,3),('2210007','22010001','22010002','007313564X434',200,'The Art of Public Speaking, Part 3','Whether a novice or an experienced speaker, every student will learn how to be a better public speaker through Lucas\' clear explanations and thorough coverage. By far the leading speech textbook of our time, The Art of Public Speaking has defined the art of being the best for more than six million students and instructors. The Lucas Learning Tools Suite offers even more tools and study options to fit the active lifestyles and diverse learning/teaching styles of today\'s students and instructors.','Public speaking','McGraw-Hill, 2007','2007-01-01 00:00:00','2021-02-01 00:00:00','English',506,'https://cft.findbook.tw/image/book/007313564X434/large',1,5,4),('2210011','22010001','22010001','1231231',3123,'qweqw','sadadad','asdasd','qweqweqw','2022-01-05 00:00:00','2021-08-06 00:00:00','English',123,'https://cft.findbook.tw/image/book/1231231/large',1,5,5),('2210012','22010003','22010001','9781498715096',50,'Advances in Mobile Cloud Computing Systems','Mobile cloud computing is considered to be a promising paradigm with a huge market, bridging the gap between the multimedia demands of end users and mobile network capacity. Unlike traditional mobile computing systems with limited capabilities, mobile cloud computing enables cutting-edge technologies. This book is the first to cover mobile cloud computing systems exclusively. It features some of the major advances in the research on mobile cloud computing and will be useful to researchers and practitioners involved in mobile communications.','Cloud Computing','Taylor & Francis','2015-12-01 00:00:00','2021-06-04 00:00:00','English',328,'https://cft.findbook.tw/image/book/9781498715096/large',1,5,4),('2210013','22010004','22010001','9783319154879',40,'Security Issues in Mobile NFC Devices','This work provides an assessment of the current state of near field communication (NFC) security, it reports on new attack scenarios, and offers concepts and solutions to overcome any unresolved issues. The work describes application-specific security aspects of NFC based on exemplary use-case scenarios and uses these to focus on the interaction with NFC tags and on card emulation. The current security architectures of NFC-enabled cellular phones are evaluated with regard to the identified security aspects.','Sercurity, Mobile','Springer International Publishing','2015-02-15 00:00:00','2021-04-04 00:00:00','English',185,'https://cft.findbook.tw/image/book/9783319154879/large',1,5,5),('2210015','22010005','22010001','9781482242836',45,'Mobile Cloud Computing: Architectures, Algorithms and Applications','Minimize Power Consumption and Enhance User Experience\n\nEssential for high-speed fifth-generation mobile networks, mobile cloud computing (MCC) integrates the power of cloud data centers with the portability of mobile computing devices. Mobile Cloud Computing: Architectures, Algorithms and Applications covers the latest technological and architectural advances in MCC. It also shows how MCC is used in health monitoring, gaming, learning, and commerce.','Cloud Computing','CRC Press','2016-01-06 00:00:00','2018-02-06 00:00:00','English',351,'https://cft.findbook.tw/image/book/9781482242836/large',1,5,5),('2210016','2210006','22010002','71477330',200,'Mobile Computing: Technology, Applications, and Service Creation','The user in a mobile computing environment is able to access data from any device in a network while on the move, spread across wired and wireless media. The technology to deliver on this promise now exists, and is one of the key drivers for growth across the telecommunications industry. This book provides a detailed survery of the technologies delivering true mobile computing – on both the service creation and device fronts. This book guides communications professionals and students through the complex web of acronyms, standards that wireless data runs on. It also details hot button security issues and new emerging technologies.','Mobile Computing','McGraw-Hill Education','2016-11-16 00:00:00','2018-07-24 00:00:00','English',672,'https://cft.findbook.tw/image/book/71477330/large',1,5,5),('2210017','2210007','22010002','1305116631',234,'Data Communications and Computer Networks: A Business User’s Approach','Balancing the most technical concepts with practical everyday issues, DATABASE COMMUNICATIONS AND COMPUTER NETWORKS, 8e provides thorough coverage of the basic features, operations, and limitations of different types of computer networks--making it the ideal resource for future business managers, computer programmers, system designers, as well as home computer users. Offering a comprehensive introduction to computer networks and data communications, the book includes coverage of the language of computer networks as well as the effects of data communications on business and society. It provides full coverage of wireless technologies, industry convergence, compression techniques, network security, LAN technologies, VoIP, and error detection and correction. The Eighth Edition also offers up-to-the-minute coverage of near field communications, updated','Computer Network','Cengage Learning','2015-01-01 00:00:00','2017-06-04 00:00:00','English',456,'https://cft.findbook.tw/image/book/1305116631/large',1,5,5),('2210018','2210008','22010002','148221539X',129,'Data Structure Practice: For Collegiate Programming Contests and Education','Combining knowledge with strategies, Data Structure Practice for Collegiate Programming Contests and Education presents the first comprehensive book on data structure in programming contests. This book is designed for training collegiate programming contest teams in the nuances of data structure and for helping college students in computer-related majors to gain deeper understanding of data structure.\n\nBased on successful experiences in many world-level contests, the book includes 204 typical problems and detailed analyses selected from the ACM International Collegiate Programming Contest and other major programming','Programming','CRC Press','2016-02-22 00:00:00','2017-02-03 00:00:00','English',496,'https://cft.findbook.tw/image/book/148221539X/large',1,5,5),('2210019','2210009','22010002','9781449361327',219,'Data Science for Business','Written by renowned data science experts Foster Provost and Tom Fawcett, Data Science for Business introduces the fundamental principles of data science, and walks you through the \"data-analytic thinking\" necessary for extracting useful knowledge and business value from the data you collect. This guide also helps you understand the many data-mining techniques in use today.\n\nBased on an MBA course Provost has taught at New York University over the past ten years, Data Science for Business provides examples of real-world business problems to illustrate these principles. You’ll not only learn how to improve communication between business stakeholders and data scientists, but also how participate intelligently in your company’s data science projects. You’ll also discover how to think data-analytically, and fully appreciate how data science methods can support business decision-making.','Data Mining','O\'Reilly','2013-07-27 00:00:00','2015-08-04 00:00:00','English',384,'https://cft.findbook.tw/image/book/9781449361327/large',1,5,5),('2210023','2210010','22010002','0071744312',139,'Oracle Database Administration for Microsoft SQL Server DBAs','Apply Your SQL Server DBA Skills to Oracle Database Administration\nUse your SQL Server experience to set up and maintain a high-performance Oracle Database environment. Written by a DBA with expertise in both platforms, Oracle Database Administration for Microsoft SQL Server DBAs illustrates each technique with clear explanations, examples, and comparison tables. Get full details on Oracle Database intervals, creation assistants, management techniques, and query tools. High availability, disaster recovery, and security procedures are also extensively covered in this comprehensive Oracle Press guide.','SQL Database','Mcgraw-hill','2010-10-06 00:00:00','2017-09-03 00:00:00','English',352,'https://cft.findbook.tw/image/book/0071744312/large',1,5,5);
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
INSERT INTO `feedback` VALUES ('22030001','e7f5bc6b-ad05-4a2f-8085-86c11aea956b','hi','hello edit'),('22030003','21120005','hi 2 edit','hello 2 edit'),('22030004','21120005','hi 3','hello 3'),('22030006','e7f5bc6b-ad05-4a2f-8085-86c11aea956b','feedback 1','answer 2'),('22030007','e7f5bc6b-ad05-4a2f-8085-86c11aea956b','feedback 2','asd asd a');
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
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `library_card_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library_card`
--

LOCK TABLES `library_card` WRITE;
/*!40000 ALTER TABLE `library_card` DISABLE KEYS */;
INSERT INTO `library_card` VALUES ('22010001','e7f5bc6b-ad05-4a2f-8085-86c11aea956b','2022-01-10',1),('22010002','21120005','2022-01-10',1),('22010005','22010010','2022-01-11',1),('22010006','22010012','2022-01-13',1),('22010007','21120006','2022-01-19',1),('22020008','22020013','2022-02-26',1),('22020011','22020014','2022-02-26',1);
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
INSERT INTO `member` VALUES ('00205e4f-3663-46e2-8dc0-376677466bf1','librarian1','$2b$12$zSg/80IEGQdxFfHEXIPc..hLBeNWRJzxQngidY.KA9xW872zYYeya',1),('21120001','librarian2','$2b$12$RkkSj9YHWPLv0bO1CnwtweC9zjr3xCeZ/z3JtM/cN4IAjXVDIpXUO',1),('21120002','librarian3','$2b$12$tgCbXQJiAhyTgJ6RD6M93OmSHiHUBZhijuB0hUnVrlptohcAzDUAu',1),('21120003','user1','$2b$12$szMFnMKmzLg0JJ3B2tNfN.KZyzeJ8dET2sF4ktqawRElvUyXMK9jq',2),('21120004','phu','$2b$12$jVcDv4lz5xd.cm199BdFVeyjf.rOoMS6T0rQ4K1K6qrrNhiBU4CyW',2),('21120005','phu1','$2b$12$JlrLIIqrywuMzqja6WDh3umqHOpv4EgCcwdpntptwsDaPzsP122H2',2),('21120006','phu2','$2b$12$fyoSccBTShLwKoKw4obg3eks7ETQi9SzzzWd6/8ln1D2BnOrW62v6',2),('21120007','phu3','$2b$12$vmveTec89Vltzz0aLTZCt.Ck1GzVp.gxzbBuw.0O/HKq8w0pZNj0S',2),('21120008','phu4','$2b$12$HdycSD2HNevzxR9oCQmjNeGgBX4J9jXizNRq.O499JL2HKE88.zVO',2),('22010009','phu8','$2b$12$KAyK/U3Gfc3ZMXuwZpqLjOFLY2omQ3ouQwyjT.s0zZIzvGnIMIxAq',2),('22010010','user69','$2b$12$d.SnwIxzsTKmyH6dBGOp1.HRiE87pmLC0npiYAAGTY6gOPgcOhIAS',2),('22010011','user89','$2b$12$m5wGTVR/yBVpiWD7Gxx2OeUONxnwIbZMhZ0tuGPl7nVBBqK0zKcUq',2),('22010012','phu00','$2b$12$8t4HgxpqwcBM/0tXUDCDZuMEaKxDMSHjIImNlyyZrfOIOtkyIMQjO',2),('22020013','phu77','$2b$12$baKx4zJI5s4IA6MjSwc.BOeD8fbBW45N679tOQNc2F6cwW1lh.Ae6',2),('22020014','phu66','$2b$12$kF6ruXZywgze.9XRlf973e.8LaMYyFMofMr3raiMTIlYKPIwq7dA.',2),('22030015','phu22','$2b$12$F1qrs/7O6V1fmfIdHEGBVOhbOMlOV4n2Pk0YS.g9m4LvPaR7Tr51a',2),('e7f5bc6b-ad05-4a2f-8085-86c11aea956b','admin','$2b$12$gLUfkvf27PnB3QgVvrJAmeN1qdmRMJXH4fx8gGJN9r8LGxtQLvmOq',0);
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
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `gender` int NOT NULL,
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
INSERT INTO `member_info` VALUES ('21120005','user 5','phunx@gmail.com','0123456789',1,'1998-01-01','Đống Đa','Hà Nội','Việt Nam',1),('21120006','phu2','phu2@gmail.com','12312314134',1,'1999-11-11','a','s','d',1),('21120008','user 8','phunx@gmail.com','0123456789',1,'1998-01-01','Đống Đa','Hà Nội','Việt Nam',1),('22010009','A','a@gmail.com','120391203901239',0,'1999-01-01','a','s','d',1),('22010010','aa','a@gmail.com','90127389012789',1,'1999-01-11','a','s','d',1),('22010012','phu00','phu00@gmail.com','3123124',0,'1987-02-12','a','s','d',1),('22020013','Nguyen Xuan Phu','phu77@gmail.com','120391203901239',0,'1999-11-11','a','s','d',1),('22020014','A','phu66@gmail.com','1235435345',0,'1888-11-11','a','s','d',1),('e7f5bc6b-ad05-4a2f-8085-86c11aea956b','Nguyễn Xuân Phú','admin@gmail.com','0123456789',1,'1988-01-01','Đống Đa','Hà Nội','Việt Nam',1);
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
INSERT INTO `serial_number` VALUES (1,1,'member',15),(2,2,'book',26),(3,3,'author',16),(4,4,'book_location',0),(5,5,'library_card',11),(6,6,'book_reservation',11),(7,7,'book_lending',17),(8,8,'feedback',13);
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

-- Dump completed on 2022-03-04 18:17:21
