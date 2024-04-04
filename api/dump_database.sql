-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: tech_interview
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` (`id`, `name`, `createdAt`) VALUES (1,'Acme Corporation','2024-04-03 16:31:18'),(2,'Globex Corporation','2024-04-03 16:31:26'),(3,'Soylent Corp','2024-04-03 16:31:36'),(4,'Initech','2024-04-03 16:31:44'),(5,'Umbrella Corporation','2024-04-03 16:31:51'),(6,'Hooli','2024-04-03 16:31:57'),(7,'Vehement Capital Partners','2024-04-03 16:32:05'),(8,'Massive Dynamic','2024-04-03 16:32:11');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employees_roles_null_fk` (`roleId`),
  CONSTRAINT `employees_roles_null_fk` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` (`id`, `lastName`, `firstName`, `email`, `avatar`, `roleId`, `createdAt`) VALUES (1,'Bechtelar','Evalyn','Clint38@hotmail.com','https://avatars.githubusercontent.com/u/33432635',2,'2024-04-03 16:26:54'),(2,'Cummerata','Bernita','Antwon_Bradtke78@hotmail.com','https://avatars.githubusercontent.com/u/53666833',1,'2024-04-03 16:28:13'),(3,'Corkery','Elinore','Margarett80@yahoo.com','https://avatars.githubusercontent.com/u/31246773',2,'2024-04-03 16:28:39'),(4,'Jones','Michele','Mckayla_Fisher@gmail.com','https://avatars.githubusercontent.com/u/25189146',2,'2024-04-03 16:29:03'),(5,'Heller','Eleanore','Helen79@gmail.com','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/36.jpg',2,'2024-04-03 16:29:25'),(6,'Grant','Lola','Sebastian94@hotmail.com','https://avatars.githubusercontent.com/u/4249748',1,'2024-04-03 16:29:50');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees_clients`
--

DROP TABLE IF EXISTS `employees_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees_clients` (
  `id` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employees_clients_clients_null_fk` (`clientId`),
  KEY `employees_clients_employees_null_fk` (`employeeId`),
  CONSTRAINT `employees_clients_clients_null_fk` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employees_clients_employees_null_fk` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees_clients`
--

LOCK TABLES `employees_clients` WRITE;
/*!40000 ALTER TABLE `employees_clients` DISABLE KEYS */;
INSERT INTO `employees_clients` (`id`, `employeeId`, `clientId`) VALUES (1,6,7),(2,1,7),(3,1,8),(4,5,3),(5,6,4),(6,1,6),(7,4,1),(8,6,7),(9,6,1),(10,4,2);
/*!40000 ALTER TABLE `employees_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `label`) VALUES (1,'Gestionnaire'),(2,'Développeur');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `amount` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sales_clients_null_fk` (`clientId`),
  CONSTRAINT `sales_clients_null_fk` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` (`id`, `clientId`, `amount`, `quantity`, `date`) VALUES (1,6,37.68,4,'2024-04-03 16:42:41'),(2,5,9.09,1,'2024-04-03 16:42:57'),(3,5,13.88,7,'2024-04-03 16:43:07'),(4,3,8.92,8,'2024-04-03 16:43:19'),(5,7,31.16,3,'2024-04-03 16:43:26'),(6,1,19.28,4,'2024-04-03 16:43:35'),(7,6,43.95,1,'2024-04-03 16:43:42'),(8,1,22.96,5,'2024-04-03 16:43:49'),(9,8,39.93,7,'2024-04-03 16:43:55'),(10,3,31.65,3,'2024-04-03 16:44:02'),(11,5,20.73,7,'2024-04-03 16:44:10'),(12,5,42.48,2,'2024-04-03 16:44:17'),(13,8,45.35,7,'2024-04-03 16:44:24'),(14,5,49.06,1,'2024-04-03 16:44:29'),(15,8,40.77,6,'2024-04-03 16:44:36'),(16,7,18.76,8,'2024-04-03 16:44:43'),(17,6,49.34,7,'2024-04-03 16:44:50'),(18,3,37.32,5,'2024-04-03 16:45:00'),(19,6,26,1,'2024-04-03 16:45:07'),(20,7,32.14,7,'2024-04-03 16:45:14'),(21,4,35.43,4,'2024-04-03 16:45:25'),(22,2,30.01,2,'2024-04-03 16:45:39'),(23,3,20.53,5,'2024-04-03 16:45:47'),(24,1,34.14,6,'2024-04-03 16:45:53'),(25,1,47.22,8,'2024-04-03 16:46:00'),(26,5,36.09,4,'2024-04-03 16:46:06'),(27,7,14.67,6,'2024-04-03 16:46:13'),(28,6,18.54,1,'2024-04-03 16:46:19'),(29,3,49.99,3,'2024-04-03 16:46:24'),(30,5,30.84,8,'2024-04-03 16:46:30'),(31,8,39.71,2,'2024-04-03 16:46:49'),(32,7,46.81,5,'2024-04-03 16:46:56'),(33,6,12.83,2,'2024-04-03 16:47:02'),(34,7,31.7,7,'2024-04-03 16:47:08'),(35,2,41.31,5,'2024-04-03 16:47:25'),(36,4,35.84,8,'2024-04-03 16:47:32'),(37,1,30.04,1,'2024-04-03 16:47:37'),(38,4,21.05,3,'2024-04-03 16:47:46'),(39,1,21.15,3,'2024-04-03 16:47:52'),(40,8,40.04,3,'2024-04-03 16:47:58'),(41,6,47.6,4,'2024-04-03 16:48:04'),(42,5,25.2,3,'2024-04-03 16:48:09'),(43,2,18.62,1,'2024-04-03 16:48:16'),(44,4,21.43,4,'2024-04-03 16:48:22'),(45,8,38.27,8,'2024-04-03 16:48:29'),(46,1,21.06,8,'2024-04-03 16:48:35'),(47,5,11.88,1,'2024-04-03 16:48:40'),(48,2,10.47,4,'2024-04-03 16:48:50'),(49,5,45.91,6,'2024-04-03 16:48:57'),(50,3,49.22,2,'2024-04-03 16:49:03');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-03 16:53:21
