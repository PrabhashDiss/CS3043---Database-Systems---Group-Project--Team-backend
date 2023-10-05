CREATE DATABASE  IF NOT EXISTS `project01` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project01`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: project01
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `customer_id` char(5) NOT NULL,
  `branch_code` varchar(4) DEFAULT NULL,
  `account_type_id` char(4) DEFAULT NULL,
  `balance` float(12,2) DEFAULT NULL,
  `account_number` char(10) NOT NULL,
  `last_active_date` date DEFAULT NULL,
  `open_date` date DEFAULT NULL,
  PRIMARY KEY (`account_number`),
  KEY `CustomerID` (`customer_id`),
  KEY `BranchCODE` (`branch_code`),
  KEY `acc_type` (`account_type_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`branch_code`) REFERENCES `branch` (`branch_code`),
  CONSTRAINT `account_ibfk_3` FOREIGN KEY (`account_type_id`) REFERENCES `account_type` (`account_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('a234','0001','s003',120000.00,'1082310654','2022-02-01','2005-06-16'),('a235','0002','s002',550000.00,'2051271952','2022-02-24','2007-06-04'),('e239','0002','s003',30000.00,'4152179632','2022-07-19','2011-03-10'),('b236','0003','s003',5100.00,'4501361875','2022-03-01','2008-02-13');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_type` (
  `interest_rate` int DEFAULT NULL,
  `min_balance` int DEFAULT NULL,
  `plan` varchar(8) DEFAULT NULL,
  `account_type_id` char(4) NOT NULL,
  `account_type` varchar(15) DEFAULT NULL,
  `withdrawals_per_month` int DEFAULT NULL,
  PRIMARY KEY (`account_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_type`
--

LOCK TABLES `account_type` WRITE;
/*!40000 ALTER TABLE `account_type` DISABLE KEYS */;
INSERT INTO `account_type` VALUES (12,0,'child','s001','saving',5),(11,500,'teen','s002','saving',5),(10,1000,'adult','s003','saving',5),(13,1000,'senior','s004','saving',5);
/*!40000 ALTER TABLE `account_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrower`
--

DROP TABLE IF EXISTS `borrower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrower` (
  `customer_id` char(4) NOT NULL,
  `loan_number` char(5) NOT NULL,
  PRIMARY KEY (`customer_id`,`loan_number`),
  KEY `loan_number` (`loan_number`),
  CONSTRAINT `borrower_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `borrower_ibfk_2` FOREIGN KEY (`loan_number`) REFERENCES `loan` (`loan_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrower`
--

LOCK TABLES `borrower` WRITE;
/*!40000 ALTER TABLE `borrower` DISABLE KEYS */;
/*!40000 ALTER TABLE `borrower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_code` varchar(4) NOT NULL,
  `branch_city` varchar(10) DEFAULT NULL,
  `assets` int DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `branch_manager` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`branch_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES ('0001','New York',12300,'2327,Patterson Road,New York','2100'),('0002','Florida',2000,'2343,Powder House Road,Florida','2200'),('0003','Houston',3200,'404,Grey Fox Farm Road,Houston','2300');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business` (
  `name` varchar(256) DEFAULT NULL,
  `incorp_date` date DEFAULT NULL,
  `customer_id` char(4) NOT NULL,
  PRIMARY KEY (`customer_id`),
  CONSTRAINT `business_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business`
--

LOCK TABLES `business` WRITE;
/*!40000 ALTER TABLE `business` DISABLE KEYS */;
INSERT INTO `business` VALUES ('Techlia ','1980-09-18','e239'),('Synergy','1983-01-07','e240'),('Odyssy Tech','1994-03-08','f242'),('Veritas Tech','1994-08-23','q243'),('Alliance','1991-04-10','s241');
/*!40000 ALTER TABLE `business` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` char(4) NOT NULL,
  `customer_name` varchar(256) DEFAULT NULL,
  `customer_city` varchar(256) DEFAULT NULL,
  `customer_street` varchar(256) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('a234','Angelica Jefferson','North Chicago','Oak Avenue','f','4377, Oak Avenue, North Chicago.'),('a235','Vivek Reyes','Chicago','Jadewood Drive','m','2932, Jadewood Drive, Chicago.'),('b236','Jerry Lim','Middletown','Marshville Road','m','3809, Marshville Road, Middletown.'),('c237','Brenda Morrison','Indianapolis','Stewart Street','f','1849, Stewart Street, Indianapolis.'),('d238','Theodore Kirk','Camp Hill','Aaron Smith Drive','m','2012, Aaron Smith Drive, Camp Hill.'),('e239','Techlia ','Quincy','Ferguson Street','f','3663, Ferguson Street, Quincy.'),('e240','Synergy','Woodland','Chardonnay Drive','f','1379, Chardonnay Drive, Woodland.'),('f242','Odyssy Tech','Pottsville','Coal Road','f','932, Coal Road, Pottsville.'),('q243','Veritas Tech','Spokane Valley','Melrose Street','f','3869, Melrose Street, Spokane Valley.'),('s241','Alliance','Manteo','Green Acres Road','f','1954, Green Acres Road, Manteo.');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_branch`
--

DROP TABLE IF EXISTS `customer_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_branch` (
  `customer_branch_id` int NOT NULL,
  `customer_id` char(4) DEFAULT NULL,
  `branch_code` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`customer_branch_id`),
  KEY `customer_id` (`customer_id`),
  KEY `branch_code` (`branch_code`),
  CONSTRAINT `customer_branch_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `customer_branch_ibfk_2` FOREIGN KEY (`branch_code`) REFERENCES `branch` (`branch_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_branch`
--

LOCK TABLES `customer_branch` WRITE;
/*!40000 ALTER TABLE `customer_branch` DISABLE KEYS */;
INSERT INTO `customer_branch` VALUES (1,'a234','0001'),(2,'a235','0002'),(3,'b236','0003'),(5,'d238','0001'),(6,'e239','0002'),(7,'e240','0003'),(8,'s241','0001'),(9,'f242','0001'),(10,'q243','0003');
/*!40000 ALTER TABLE `customer_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` varchar(5) NOT NULL,
  `branch_code` varchar(4) DEFAULT NULL,
  `employee_name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `BranchCODE` (`branch_code`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`branch_code`) REFERENCES `branch` (`branch_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('2100','0001','Lyric Mueller'),('2200','0002','Dereon Lam'),('2300','0003','Trace Lawrence'),('2342','0002','Joslyn Nichols'),('3453','0001','Lincoln Levy'),('3958','0001','David Reyes'),('5434','0001','Eduard Anahid'),('6353','0002','Maria Wyatt'),('6543','0003','Edith Solomon');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `individual`
--

DROP TABLE IF EXISTS `individual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `individual` (
  `date_of_birth` date DEFAULT NULL,
  `first_name` varchar(256) DEFAULT NULL,
  `last_name` varchar(256) DEFAULT NULL,
  `customer_id` char(4) NOT NULL,
  PRIMARY KEY (`customer_id`),
  CONSTRAINT `individual_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `individual`
--

LOCK TABLES `individual` WRITE;
/*!40000 ALTER TABLE `individual` DISABLE KEYS */;
INSERT INTO `individual` VALUES ('1969-10-08','Angelica ','Jefferson','a234'),('1975-06-19','Vivek ','Reyes','a235'),('1987-09-04','Jerry ','Lim','b236'),('1993-09-09','Brenda ','Morrison','c237'),('2000-08-30','Theodore ','Kirk','d238');
/*!40000 ALTER TABLE `individual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `loan_number` varchar(12) NOT NULL,
  `branch_code` varchar(4) DEFAULT NULL,
  `amount` float(12,2) DEFAULT NULL,
  `loan_type_id` char(4) DEFAULT NULL,
  `loan_duration` int DEFAULT NULL,
  `interest_rate` float(4,2) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `is_personal` tinyint(1) DEFAULT NULL,
  `is_online` tinyint(1) DEFAULT NULL,
  `loan_status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`loan_number`),
  KEY `BranchCODE` (`branch_code`),
  KEY `loan_type_id` (`loan_type_id`),
  CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`branch_code`) REFERENCES `branch` (`branch_code`),
  CONSTRAINT `loan_ibfk_2` FOREIGN KEY (`loan_type_id`) REFERENCES `loan_type` (`loan_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES ('214587452','0002',300000.00,'0001',6,12.00,'2022-11-20','2023-05-20',1,0,NULL),('236545652','0003',5000000.00,'0004',12,22.45,'2022-12-19','2024-12-19',0,0,NULL),('236548789','0001',400000.00,'0001',24,12.00,'2022-08-05','2024-11-24',1,1,NULL),('254845758','0002',200000.00,'0002',12,15.00,'2022-11-24','2023-11-24',1,0,NULL),('254897526','0002',1000000.00,'0005',60,21.00,'2021-05-20','2026-05-20',1,1,NULL),('256548852','0003',350000.00,'0000',12,12.50,'2022-11-10','2023-11-10',1,1,NULL);
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_payment`
--

DROP TABLE IF EXISTS `loan_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_payment` (
  `loan_number` varchar(12) NOT NULL,
  `payment_id` int NOT NULL,
  `payment_reference_number` char(5) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_amount` float NOT NULL,
  `proof_of_payment` longblob NOT NULL,
  `payment_status` int NOT NULL,
  `remarks` varchar(50) NOT NULL,
  PRIMARY KEY (`loan_number`,`payment_id`),
  CONSTRAINT `loan_payment_ibfk_1` FOREIGN KEY (`loan_number`) REFERENCES `loan` (`loan_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_payment`
--

LOCK TABLES `loan_payment` WRITE;
/*!40000 ALTER TABLE `loan_payment` DISABLE KEYS */;
INSERT INTO `loan_payment` VALUES ('254845758',2,'78423','2011-07-30',1000,'',1,'remark_454'),('254897526',1,'13456','2014-11-21',2000,'',1,'remark_123'),('256548852',3,'16803','2022-10-14',1000,'',0,'remark_433');
/*!40000 ALTER TABLE `loan_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_type`
--

DROP TABLE IF EXISTS `loan_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_type` (
  `loan_type_id` char(4) NOT NULL,
  `base_amount` decimal(10,3) DEFAULT NULL,
  `interest_rate` decimal(10,3) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`loan_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_type`
--

LOCK TABLES `loan_type` WRITE;
/*!40000 ALTER TABLE `loan_type` DISABLE KEYS */;
INSERT INTO `loan_type` VALUES ('0000',50000.000,12.500,'small business loan','description1'),('0001',200000.000,12.000,'mortgage loan','description2'),('0002',100000.000,15.000,'mortgage loan','description3'),('0003',1000000.000,18.000,'large business loan','description4'),('0004',500000.000,22.450,'vehicle loan','description5'),('0005',250000.000,21.000,'personal loan','description6');
/*!40000 ALTER TABLE `loan_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transaction_id` char(4) NOT NULL,
  `account_number` char(10) DEFAULT NULL,
  `transaction_description` varchar(256) DEFAULT NULL,
  `amount` float(12,2) DEFAULT NULL,
  `execution_branch_code` varchar(4) DEFAULT NULL,
  `transaction_timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `account_number` (`account_number`),
  KEY `execution_branch_code` (`execution_branch_code`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`account_number`) REFERENCES `account` (`account_number`),
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`execution_branch_code`) REFERENCES `branch` (`branch_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES ('7762','4152179632','paying employees their salary',5060.70,'0003','2014-07-05 00:27:00');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-24 11:46:26
