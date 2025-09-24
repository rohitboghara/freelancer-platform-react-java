-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: demo1
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `bank_details`
--

DROP TABLE IF EXISTS `bank_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_holder_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_details`
--

LOCK TABLES `bank_details` WRITE;
/*!40000 ALTER TABLE `bank_details` DISABLE KEYS */;
INSERT INTO `bank_details` VALUES (1,'Tech Startup Inc.','25187406471','Silicon Valley Bank','Silicon Valley Branch','SVBL0000123'),(2,'Marketing Agency HQ','25187406472','Bank of America','New York Central','BOFA0000456'),(3,'E-Commerce Entrepreneur','25187406473','Wells Fargo','Miami Downtown','WFBI0000789'),(4,'Design Studio Manager','25187406474','Chase Bank','Los Angeles Arts District','CHAS0000987'),(5,'Small Business Owner','25187406475','Citibank','Dallas Main Street','CITI0000567'),(6,'Tech Solutions Ltd.','25187406476','HSBC Bank','London City Center','HSBC0001234'),(7,'Creative Agency Ltd.','25187406477','Barclays Bank','Manchester Central','BARC0002345'),(8,'Finance Experts','25187406478','Royal Bank of Scotland','Edinburgh Main Branch','RBSK0003456'),(9,'Innovative Design Co.','25187406479','Standard Chartered','London Financial District','STCI0004567'),(10,'Digital Marketing Inc.','25187406480','Lloyds Bank','Birmingham West End','LLYD0005678'),(11,'Home Builders Corp.','********481','BOB','Glasgow Branch','NBSC0006789'),(12,'Global Tech Partners','25187406482','Santander Bank','Leeds City Branch','SANT0007890'),(13,'E-Commerce Innovations','25187406483','CitiBank','Bristol Commercial Hub','CITI0008901'),(14,'Investment Advisory Group','25187406484','JP Morgan Chase','Manchester Financial Park','JPMK0009012'),(15,'Health & Wellness Co.','25187406485','DBS Bank','Singapore Financial District','DBSK0000123'),(16,'Renewable Energy Solutions','25187406486','Bank of India','Mumbai Business Hub','BKID0001234'),(17,'Automobile Ventures Ltd.','25187406487','Axis Bank','Delhi Corporate Center','AXIS0002345'),(18,'Construction Enterprises','25187406488','ICICI Bank','Chennai Central','ICIC0003456'),(19,'Online Retailers Ltd.','25187406489','HDFC Bank','Kolkata Main Branch','HDFC0004567'),(20,'Smart Innovations Pvt. Ltd.','25187406490','Yes Bank','Pune Technology Park','YESB0005678'),(25,'Liam Anderson','1234567890','Royal Bank of Canada','Ontario Branch','RBCOCA123456'),(26,'Emily Watson','2345678901','Commonwealth Bank of Australia','Sydney Branch','CBAAUS12345'),(27,'Ethan Bennett','3456789012','JPMorgan Chase','New York Branch','CHASUS33XXX'),(28,'Sophie Martinez','4567890123','Banco Santander','Barcelona Branch','BSCHESMMXXX'),(29,'Noah Schmidt','5678901234','Deutsche Bank','Berlin Branch','DEUTDEFFXXX'),(30,'Olivia Garcia','6789012345','Banco Santander Río','Buenos Aires Branch','BSBARSBAXXX'),(31,'Lucas Wilson','7890123456','Bank of America','Chicago Branch','BOFAUS3NXXX'),(32,'Ava Miller','8901234567','Standard Bank','Cape Town Branch','SBZAZAJJXXX'),(33,'Mason Evans','9012345678','ANZ Bank','Brisbane Branch','ANZBAU3MXXX'),(34,'Isabella Turner','0123456789','ING Bank','Amsterdam Branch','INGBNL2AXXX');
/*!40000 ALTER TABLE `bank_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `certificate_issuer` varchar(255) DEFAULT NULL,
  `certificate_name` varchar(255) DEFAULT NULL,
  `issued_date` varchar(255) DEFAULT NULL,
  `profile_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8jiexhv77qcxu0kiybv0jirmc` (`profile_id`),
  CONSTRAINT `FK8jiexhv77qcxu0kiybv0jirmc` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
INSERT INTO `certificates` VALUES (1,'Pluralsight','REST API Development','2023-12-14',1),(2,'Pluralsight','REST API Development','2020-10-20',1),(3,'Pluralsight','REST API Development','2024-08-25',2),(4,'Coursera','Frontend Development','2022-05-11',2),(5,'LinkedIn Learning','REST API Development','2022-08-09',2),(6,'Google','Cloud Developer','2024-05-04',3),(7,'Coursera','DevOps Fundamentals','2024-12-13',3),(8,'Coursera','REST API Development','2021-03-12',4),(9,'Google','REST API Development','2023-12-01',4),(10,'LinkedIn Learning','DevOps Fundamentals','2024-12-13',4),(11,'LinkedIn Learning','Cloud Developer','2022-04-16',5),(12,'Coursera','Cloud Developer','2024-07-25',5),(13,'Udemy','Spring Boot Masterclass','2024-05-18',6),(14,'Pluralsight','SEO Certification','2024-04-18',6),(15,'Coursera','React Nanodegree','2024-09-23',6),(16,'Pluralsight','DevOps Fundamentals','2020-04-27',7),(17,'LinkedIn Learning','SEO Certification','2020-04-08',7),(18,'LinkedIn Learning','SEO Certification','2024-02-24',8),(19,'Coursera','Java Developer Certificate','2020-09-23',8),(20,'Pluralsight','Cloud Developer','2021-06-05',8),(21,'LinkedIn Learning','React Nanodegree','2023-10-23',9),(22,'Google','SEO Certification','2024-02-17',9),(23,'Coursera','Digital Marketing Masterclass','2020-12-15',10),(24,'Coursera','Spring Boot Masterclass','2022-11-05',10),(25,'Pluralsight','Digital Marketing Masterclass','2023-04-12',10),(26,'VeriSign','Client Authenticity Verified','2024-04-20',11),(27,'VeriSign','Client Authenticity Verified','2024-04-20',12),(28,'VeriSign','Client Authenticity Verified','2024-04-20',13),(29,'VeriSign','Client Authenticity Verified','2024-04-20',14),(30,'VeriSign','Client Authenticity Verified','2024-04-20',15),(31,'VeriSign','Client Authenticity Verified','2024-04-20',16),(32,'VeriSign','Client Authenticity Verified','2024-04-20',17),(33,'VeriSign','Client Authenticity Verified','2024-04-20',18),(34,'VeriSign','Client Authenticity Verified','2024-04-20',19),(35,'VeriSign','Client Authenticity Verified','2024-04-20',20),(36,'Microsoft','Azure Fundamentals','2021-05-12',21),(37,'Google','Associate Cloud Engineer','2022-06-20',21),(38,'Coursera','Machine Learning by Stanford University','2021-08-15',21),(39,'Udemy','Web Development Bootcamp','2020-11-30',21),(40,'Adobe','Certified Expert in Adobe Photoshop','2021-04-10',22),(41,'Coursera','Graphic Design Specialization','2022-01-22',22),(42,'LinkedIn Learning','UX/UI Design Certificate','2022-07-18',22),(43,'Skillshare','Masterclass in Digital Illustration','2021-09-05',22),(44,'Cisco','CCNA Certification','2021-03-25',23),(45,'Oracle','Java Programming Certification','2022-10-14',23),(46,'Udemy','Data Structures and Algorithms','2021-05-18',23),(47,'Coursera','Cloud Computing with AWS','2022-02-28',23),(48,'Project Management Institute','Project Management Professional (PMP)','2021-11-10',24),(49,'Harvard Extension School','Construction Project Management','2022-06-15',24),(50,'University of Melbourne','Advanced Civil Engineering','2021-12-05',24),(51,'Udemy','Building Construction & Sustainability Certificate','2020-08-30',24),(52,'MIT','Robotics Professional Certificate','2021-01-12',25),(53,'Coursera','Advanced Mechanical Engineering Certificate','2022-09-07',25),(54,'Google','Certified Android Developer','2022-05-18',25),(55,'Udemy','Introduction to Aerospace Engineering','2021-03-30',25),(56,'Harvard Business School','Leadership in Business Management','2022-04-18',26),(57,'Udemy','Marketing Strategy Certificate','2021-06-22',26),(58,'LinkedIn Learning','Digital Marketing Professional Certificate','2021-11-25',26),(59,'Coursera','Finance for Non-Financial Managers','2020-12-30',26),(60,'School of the Art Institute of Chicago','Certificate in Fine Arts','2021-07-22',27),(61,'Yale University','Sculpture Professional Certificate','2022-03-11',27),(62,'Skillshare','Mastering Contemporary Art Techniques','2021-05-10',27),(63,'Coursera','Fundamentals of 3D Art','2020-08-05',27),(64,'University of California, Berkeley','Data Science Certification','2021-02-14',28),(65,'Coursera','Python for Data Science','2022-07-08',28),(66,'Microsoft','Data Analytics with Power BI','2022-11-20',28),(67,'Udemy','Big Data Analysis with Hadoop','2021-04-12',28),(68,'University of Oxford','Clinical Psychology Certification','2021-09-17',29),(69,'Coursera','Psychological First Aid Certificate','2022-03-05',29),(70,'Harvard Medical School','Mental Health in the Workplace','2022-06-22',29),(71,'LinkedIn Learning','Introduction to Counseling and Therapy','2021-08-30',29),(72,'Indian Institute of Technology, Madras','Chemical Engineering Advanced Certificate','2021-10-10',30),(73,'University of California, Los Angeles','Environmental Engineering Fundamentals','2022-12-02',30),(74,'Coursera','Sustainable Energy Systems Certificate','2021-07-19',30),(75,'Udemy','Wastewater Treatment Processes','2021-04-28',30);
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` bigint NOT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `status` enum('ACTIVE','CLOSED') DEFAULT NULL,
  `client_id` int NOT NULL,
  `freelancer_id` int NOT NULL,
  `job_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKex51lsj5ult7muto1fsb6omqx` (`job_id`),
  KEY `FK76yww0trb7aarke7403plvyd0` (`client_id`),
  KEY `FKgcb16ui62f30t9mu7pu9sj1mn` (`freelancer_id`),
  CONSTRAINT `FK76yww0trb7aarke7403plvyd0` FOREIGN KEY (`client_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKb83wlyn98n70qftkpyv71kpnd` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`),
  CONSTRAINT `FKgcb16ui62f30t9mu7pu9sj1mn` FOREIGN KEY (`freelancer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
INSERT INTO `contract` VALUES (1,5000,'2025-05-29 05:30:00.000000','2025-04-29 05:30:00.000000','ACTIVE',11,35,42),(2,8000,'2025-06-29 05:30:00.000000','2025-04-29 05:30:00.000000','ACTIVE',11,2,43),(3,8000,'2025-06-10 05:30:00.000000','2025-05-10 05:30:00.000000','ACTIVE',12,3,1),(4,8000,'2025-06-04 05:30:00.000000','2025-05-04 05:30:00.000000','ACTIVE',12,22,3);
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course` varchar(255) DEFAULT NULL,
  `institute` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `profile_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKelocxwwcyf5acj85hgke1c0fl` (`profile_id`),
  CONSTRAINT `FKelocxwwcyf5acj85hgke1c0fl` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (10,'B.Sc. Computer Science','New York University','2018',1),(11,'M.Sc. Web Technologies','Columbia University','2020',1),(12,'B.Des Graphic Design','ArtCenter College of Design','2017',2),(13,'Diploma in UI/UX','California Institute of the Arts','2019',2),(14,'B.A. English Literature','University of Chicago','2016',3),(15,'Certificate in Content Strategy','Northwestern University','2018',3),(16,'BBA Marketing','University of California, Berkeley','2016',4),(17,'MBA Digital Marketing','Stanford University','2019',4),(18,'B.Tech IT','San Francisco State University','2015',5),(19,'Certification in SEO','UC Berkeley Extension','2017',5),(20,'B.A. Film & Media','UCLA','2017',6),(21,'Certification in Video Editing','New York Film Academy','2019',6),(22,'B.Des UX Design','University of Texas at Austin','2018',7),(23,'M.Des Human-Centered Design','Savannah College of Art and Design','2020',7),(24,'B.Tech Computer Engineering','University of Washington','2017',8),(25,'Diploma in Mobile App Development','Seattle Central College','2019',8),(26,'B.A. Communication','Northwestern University','2016',9),(27,'Certification in Social Media Marketing','University of Illinois','2018',9),(28,'B.F.A. Photography','School of Visual Arts, NYC','2018',10),(29,'Diploma in Digital Imaging','Parsons School of Design','2020',10),(52,'B.Sc. in Computer Science','University of Toronto','2021',21),(53,'M.Sc. in Software Engineering','University of Waterloo','2023',21),(54,'B.A. in Graphic Design','Rhode Island School of Design','2020',22),(55,'MFA in Digital Arts','California Institute of the Arts','2022',22),(56,'B.Tech in Electrical Engineering','Indian Institute of Technology, Bombay','2019',23),(57,'M.Tech in Robotics','Indian Institute of Technology, Delhi','2021',23),(58,'B.Sc. in Civil Engineering','University of Melbourne','2018',24),(59,'M.Sc. in Construction Management','University of Sydney','2021',24),(60,'B.Tech in Mechanical Engineering','Massachusetts Institute of Technology','2020',25),(61,'M.S. in Aerospace Engineering','Stanford University','2023',25),(62,'B.B.A. in Business Administration','Harvard Business School','2022',26),(63,'M.B.A. in Marketing','University of Chicago Booth School of Business','2024',26),(64,'B.F.A. in Fine Arts','School of the Art Institute of Chicago','2019',27),(65,'M.F.A. in Sculpture','Yale University School of Art','2021',27),(66,'B.Tech in Information Technology','National Institute of Technology, Tiruchirappalli','2017',28),(67,'M.Sc. in Data Science','University of California, Berkeley','2021',28),(68,'B.A. in Psychology','University of Oxford','2020',29),(69,'M.Sc. in Clinical Psychology','University of Cambridge','2023',29),(70,'B.Tech in Chemical Engineering','Indian Institute of Technology, Madras','2021',30),(71,'M.Tech in Environmental Engineering','University of California, Los Angeles','2023',30);
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_company_name` varchar(255) DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `freelancer_name` varchar(255) DEFAULT NULL,
  `portal_fee` bigint NOT NULL,
  `transaction_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKo61w8sj1xunllw9hlqiihm6qf` (`transaction_id`),
  CONSTRAINT `FKtn3dxd7hgxd9bad2t2cr3btt4` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `payout_methods` enum('hourly','project','sprint') DEFAULT 'project',
  `status` enum('ACTIVE','CLOSED','COMPLETED') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `FKwt9rlm2s6w639pwilcbli7py` (`client_id`),
  CONSTRAINT `FKwt9rlm2s6w639pwilcbli7py` FOREIGN KEY (`client_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,1500,'Develop and manage a paid ad campaign across various social media platforms for Client 12’s brand awareness.','1 month','project','ACTIVE','Social Media Ad Campaign',12),(2,1200,'Optimize the website content, structure, and keywords to increase organic search ranking for Client 12\'s website.','3 weeks','hourly','ACTIVE','SEO Optimization for Website',12),(3,1800,'Create a comprehensive brand strategy that includes logo redesign, messaging, and positioning for Client 12.','1 month','project','ACTIVE','Brand Strategy Development',12),(4,1000,'Design and execute a targeted email campaign to engage Client 12’s existing customers and attract new ones.','2 weeks','sprint','ACTIVE','Email Marketing Campaign',12),(5,1500,'Develop a content strategy that aligns with Client 12’s brand goals and target audience to boost engagement and sales.','1 month','sprint','ACTIVE','Content Marketing Strategy',12),(6,2500,'Design and develop a modern, responsive website for Client 13’s new product launch.','2 months','project','ACTIVE','Website Design',13),(7,800,'Capture high-quality product images for Client 13’s online store and marketing materials.','3 weeks','hourly','ACTIVE','Product Photography',13),(8,1200,'Develop an SEO strategy and write engaging content to improve Client 13’s search rankings and user engagement.','1 month','sprint','ACTIVE','SEO & Content Strategy',13),(9,1500,'Manage Client 13’s social media accounts, creating content and engaging with followers to build brand presence.','1 month','hourly','ACTIVE','Social Media Management',13),(10,1800,'Create and manage an ad campaign on various platforms to promote Client 13’s new service offering.','1 month','project','ACTIVE','Ad Campaign',13),(11,500,'Design a unique logo for Client 14’s new business, reflecting their values and target market.','2 weeks','project','ACTIVE','Logo Design',14),(12,2000,'Redesign Client 14’s website to make it modern, user-friendly, and mobile-optimized.','1 month','hourly','ACTIVE','Website Redesign',14),(13,1800,'Develop a comprehensive marketing strategy for Client 14’s business to increase brand awareness and lead generation.','1 month','sprint','ACTIVE','Marketing Strategy',14),(14,1500,'Integrate e-commerce functionality into Client 14’s website to allow customers to make purchases online.','1 month','project','ACTIVE','E-Commerce Integration',14),(15,800,'Create a content strategy for Client 14’s blog and social media channels to increase customer engagement.','2 weeks','sprint','ACTIVE','Content Strategy Development',14),(16,2000,'Build a modern, responsive website for Client 15’s new online store.','1 month','project','ACTIVE','Website Development',15),(17,1200,'Improve the search engine visibility and ranking for Client 15’s website by optimizing the content and structure.','1 month','hourly','ACTIVE','Search Engine Optimization',15),(18,1000,'Design a branding package for Client 15, including logo, business cards, and marketing collateral.','2 weeks','project','ACTIVE','Branding Package',15),(19,1500,'Create and manage a pay-per-click advertising campaign for Client 15 to drive traffic to their online store.','1 month','sprint','ACTIVE','PPC Campaign Management',15),(20,900,'Design and run an email marketing campaign for Client 15 to nurture leads and convert them into customers.','2 weeks','sprint','ACTIVE','Email Marketing',15),(21,2000,'Provide brand strategy consultation services to Client 16 to help them position their product in the market.','1 month','sprint','ACTIVE','Brand Strategy Consultation',16),(22,1800,'Manage social media ad campaigns for Client 16 to promote their latest product launch and services.','1 month','project','ACTIVE','Social Media Advertising',16),(23,1500,'Optimize Client 16’s website for better user experience, speed, and performance.','3 weeks','hourly','ACTIVE','Website Optimization',16),(24,1200,'Plan and execute a marketing strategy for Client 16’s upcoming event to maximize attendance and engagement.','1 month','project','ACTIVE','Event Promotion',16),(25,2500,'Set up an e-commerce platform for Client 16 to sell their products online, including payment gateway integration.','1 month','sprint','ACTIVE','E-commerce Setup',16),(26,2000,'Design an intuitive and attractive UI for Client 17\'s Android/iOS mobile application.','3 weeks','project','ACTIVE','Mobile App UI Design',17),(27,3500,'Develop a cross-platform mobile app using Flutter for Client 17\'s business operations.','2 months','sprint','ACTIVE','Flutter App Development',17),(28,1200,'Improve loading time, responsiveness, and performance metrics of Client 17\'s existing mobile app.','2 weeks','hourly','ACTIVE','App Performance Optimization',17),(29,800,'Add push notification system to engage users and increase retention in Client 17\'s app.','1 week','project','ACTIVE','Push Notification Integration',17),(30,1000,'Integrate third-party APIs (like payment or maps) into Client 17\'s mobile application.','2 weeks','hourly','ACTIVE','API Integration for App',17),(31,1500,'Create an interactive sales dashboard in Power BI or Tableau for Client 18.','3 weeks','project','ACTIVE','Sales Dashboard Development',18),(32,1800,'Analyze customer behavior data and generate insights to help Client 18 improve services.','1 month','sprint','ACTIVE','Customer Analytics',18),(33,1200,'Develop automated data extraction and report scripts using Python for Client 18.','2 weeks','hourly','ACTIVE','Automated Reports with Python',18),(34,1000,'Evaluate ROI and performance of previous marketing campaigns using data analytics.','10 days','sprint','ACTIVE','Marketing Campaign Analysis',18),(35,1100,'Optimize large datasets and SQL queries for faster performance on Client 18\'s analytics system.','2 weeks','hourly','ACTIVE','Database Optimization',18),(36,2000,'Build a route optimization algorithm to reduce delivery time and costs.','1 month','project','ACTIVE','Delivery Route Optimization System',20),(37,1500,'Redesign the existing logistics website to improve UX and mobile usability.','3 weeks','project','ACTIVE','Logistics Website Redesign',20),(38,2200,'Implement GPS-based tracking for delivery vehicles and packages.','1 month','sprint','ACTIVE','Real-time Tracking System',20),(39,1200,'Create a tool to manage and forecast inventory for Client 20\'s warehouse operations.','2 weeks','hourly','ACTIVE','Inventory Management Tool',20),(40,1000,'Develop SMS/email-based delivery notifications for end users.','1 week','project','ACTIVE','Delivery Notification System',20),(41,2500,'Develop a professional corporate website with modern design for Client 11.','1 month','project','ACTIVE','Corporate Website Development',11),(42,1500,'Set up SEO and Google Ads campaigns for Client 11\'s digital clients.','2 weeks','sprint','ACTIVE','SEO & SEM Campaign Setup',11),(43,800,'Design promotional graphics for Facebook, Instagram, and LinkedIn posts.','10 days','hourly','ACTIVE','Graphic Design for Social Media',11),(44,1100,'Create an email automation system using Mailchimp for weekly newsletters.','2 weeks','project','ACTIVE','Email Newsletter Automation',11),(45,1800,'Develop a secure client portal for project tracking and document sharing.','3 weeks','sprint','ACTIVE','Client Portal Development',11),(46,2500,'Set up an LMS like Moodle or LearnDash for Client 19\'s e-learning site.','1 month','project','ACTIVE','Learning Management System Setup',19),(47,900,'Organize and format educational content (videos, PDFs, quizzes) for Client 19.','3 weeks','hourly','ACTIVE','Course Content Formatting',19),(48,1000,'Create a custom quiz/test module for student assessments on Client 19\'s platform.','2 weeks','sprint','ACTIVE','Quiz Module Development',19),(49,1300,'Implement a student progress tracker and analytics dashboard.','2 weeks','project','ACTIVE','Student Progress Tracker',19),(50,1500,'Develop a portal for onboarding instructors and uploading their content.','1 month','sprint','ACTIVE','Instructor Onboarding Portal',19);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_skills_required`
--

DROP TABLE IF EXISTS `jobs_skills_required`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_skills_required` (
  `jobs_job_id` int NOT NULL,
  `skills_required` varchar(255) DEFAULT NULL,
  KEY `FK93t1apsonxvvr18rrhsy0uaq` (`jobs_job_id`),
  CONSTRAINT `FK93t1apsonxvvr18rrhsy0uaq` FOREIGN KEY (`jobs_job_id`) REFERENCES `job` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_skills_required`
--

LOCK TABLES `jobs_skills_required` WRITE;
/*!40000 ALTER TABLE `jobs_skills_required` DISABLE KEYS */;
INSERT INTO `jobs_skills_required` VALUES (1,'Facebook Ads'),(1,'Instagram Marketing'),(1,'Twitter Ads'),(1,'Audience Targeting'),(1,'Content Strategy'),(1,'Video Editing'),(1,'Copywriting'),(1,'Campaign Analytics'),(1,'Budget Management'),(2,'SEO'),(2,'Keyword Research'),(2,'On-page Optimization'),(2,'Off-page SEO'),(2,'Google Analytics'),(2,'Backlink Analysis'),(2,'Content Writing'),(2,'Technical SEO'),(2,'Competitor Analysis'),(3,'Brand Positioning'),(3,'Market Research'),(3,'Logo Design'),(3,'Storytelling'),(3,'Marketing Strategy'),(3,'Content Development'),(3,'User Persona Creation'),(3,'Competitor Benchmarking'),(3,'Value Proposition Design'),(4,'Email Campaign Setup'),(4,'Mailchimp'),(4,'Email Copywriting'),(4,'A/B Testing'),(4,'Audience Segmentation'),(4,'Email Analytics'),(4,'Lead Nurturing'),(4,'Responsive Email Design'),(4,'Conversion Tracking'),(5,'Content Planning'),(5,'SEO Content Writing'),(5,'Video Scripting'),(5,'Social Media Strategy'),(5,'Blogging'),(5,'Influencer Outreach'),(5,'Email Content'),(5,'Content Distribution'),(5,'Analytics Reporting'),(6,'UI/UX Design'),(6,'HTML'),(6,'CSS'),(6,'JavaScript'),(6,'Responsive Design'),(6,'Adobe XD'),(6,'Wireframing'),(6,'SEO Optimization'),(6,'Web Hosting'),(6,'CMS Integration'),(7,'Android Development'),(7,'iOS Development'),(7,'React Native'),(7,'API Integration'),(7,'UI/UX Design'),(7,'Firebase'),(7,'App Testing'),(7,'Google Play Deployment'),(7,'App Store Submission'),(7,'Bug Fixing'),(8,'SEO Audit'),(8,'Website Analytics'),(8,'Keyword Analysis'),(8,'Social Media Performance Review'),(8,'Competitor Analysis'),(8,'Google Analytics'),(8,'Campaign Reporting'),(8,'Conversion Rate Optimization'),(8,'Backlink Analysis'),(8,'Traffic Source Analysis'),(9,'Product Photography Editing'),(9,'Product Description Writing'),(9,'Inventory Management'),(9,'SEO Keywords for Products'),(9,'Category Mapping'),(9,'CMS Management'),(9,'Pricing Strategy'),(9,'Order Management System'),(9,'Customer Support'),(9,'Stock Forecasting'),(10,'MS Excel'),(10,'Google Sheets'),(10,'Data Cleaning'),(10,'Data Formatting'),(10,'Fast Typing'),(10,'Attention to Detail'),(10,'File Conversion'),(10,'Database Entry'),(10,'Data Validation'),(10,'Spreadsheet Formulas'),(11,'Adobe Premiere Pro'),(11,'Final Cut Pro'),(11,'Video Scripting'),(11,'Audio Editing'),(11,'Motion Graphics'),(11,'Color Correction'),(11,'YouTube SEO'),(11,'Video Thumbnails'),(11,'Content Planning'),(11,'After Effects'),(12,'Email Management'),(12,'Calendar Management'),(12,'Social Media Scheduling'),(12,'Travel Booking'),(12,'MS Office'),(12,'Customer Service'),(12,'Data Entry'),(12,'Online Research'),(12,'CRM Tools'),(12,'Task Management Tools'),(13,'Adobe Photoshop'),(13,'Adobe Illustrator'),(13,'Canva'),(13,'Branding Design'),(13,'Logo Design'),(13,'Brochure Design'),(13,'Infographics'),(13,'UI Mockups'),(13,'Color Theory'),(13,'Typography'),(14,'Survey Design'),(14,'Data Collection'),(14,'Statistical Analysis'),(14,'Competitor Research'),(14,'Data Interpretation'),(14,'Report Writing'),(14,'Presentation Skills'),(14,'Market Trend Analysis'),(14,'SWOT Analysis'),(14,'Industry Research'),(15,'SEO Writing'),(15,'WordPress CMS'),(15,'Content Strategy'),(15,'Keyword Research'),(15,'Proofreading'),(15,'Plagiarism Checking'),(15,'Blog Topic Research'),(15,'Headline Writing'),(15,'Internal Linking'),(15,'Content Marketing'),(16,'HTML'),(16,'CSS'),(16,'JavaScript'),(16,'Responsive Design'),(16,'CMS (WordPress/Shopify)'),(16,'UX/UI Principles'),(17,'SEO Tools (Ahrefs, SEMrush)'),(17,'Keyword Research'),(17,'On-Page SEO'),(17,'Technical SEO'),(17,'Google Analytics'),(18,'Graphic Design'),(18,'Adobe Illustrator'),(18,'Adobe Photoshop'),(18,'Typography'),(18,'Logo Design'),(19,'Google Ads'),(19,'PPC Strategy'),(19,'Keyword Planning'),(19,'Conversion Tracking'),(19,'Campaign Optimization'),(20,'Email Marketing Platforms (Mailchimp, SendGrid)'),(20,'Copywriting'),(20,'A/B Testing'),(20,'Automation'),(21,'Market Research'),(21,'Brand Positioning'),(21,'Competitive Analysis'),(21,'Strategic Planning'),(22,'Facebook Ads'),(22,'Instagram Ads'),(22,'LinkedIn Ads'),(22,'Audience Targeting'),(22,'Campaign Reporting'),(23,'Performance Testing (Lighthouse)'),(23,'Image Optimization'),(23,'CDN Setup'),(23,'UX Best Practices'),(24,'Digital Marketing'),(24,'Social Media Management'),(24,'Event Management Tools'),(24,'Content Creation'),(25,'Shopify/WooCommerce'),(25,'Payment Gateway Integration'),(25,'Inventory Management'),(25,'UX/UI'),(26,'Figma/Adobe XD'),(26,'Mobile UX Principles'),(26,'Android/iOS Guidelines'),(26,'Wireframing'),(27,'Flutter'),(27,'Dart'),(27,'Firebase'),(27,'REST APIs'),(27,'Cross-Platform Mobile Development'),(28,'Profiling Tools (Android Profiler)'),(28,'Code Refactoring'),(28,'Caching'),(28,'App Load Time Optimization'),(29,'Firebase Cloud Messaging (FCM)'),(29,'Backend Integration'),(29,'User Segmentation'),(30,'REST APIs'),(30,'JSON'),(30,'OAuth'),(30,'Postman'),(30,'Backend Programming (Node.js, Java, Python)'),(31,'Power BI'),(31,'Tableau'),(31,'SQL'),(31,'Data Visualization'),(31,'KPI Reporting'),(32,'Data Analysis'),(32,'SQL'),(32,'Google Analytics'),(32,'R/Python (for data modeling)'),(33,'Python (Pandas, NumPy)'),(33,'Web Scraping'),(33,'Automation Libraries (Schedule, Cron)'),(34,'Google Analytics'),(34,'ROI Analysis'),(34,'Campaign Reporting'),(34,'Excel'),(35,'SQL'),(35,'Query Optimization'),(35,'Database Indexing'),(35,'Performance Tuning'),(36,'Algorithms'),(36,'Google Maps API'),(36,'Route Optimization Tools'),(36,'Python/Java'),(37,'Web Design'),(37,'UX/UI Design'),(37,'Responsive Web Development'),(37,'WordPress'),(38,'GPS APIs'),(38,'Mobile App Integration'),(38,'Firebase Realtime Database'),(38,'WebSockets'),(39,'Inventory Software'),(39,'SQL'),(39,'Data Analytics'),(39,'Dashboard Development'),(40,'Twilio'),(40,'SMTP'),(40,'Push Notification APIs'),(40,'Backend Integration'),(41,'Web Development'),(41,'CMS'),(41,'UI/UX'),(41,'Hosting & Deployment'),(42,'Google Ads'),(42,'Google Analytics'),(42,'SEO Tools'),(42,'A/B Testing'),(43,'Canva'),(43,'Photoshop'),(43,'Illustrator'),(43,'Social Media Dimensions'),(43,'Branding'),(44,'Mailchimp'),(44,'Email Templates'),(44,'A/B Testing'),(44,'List Segmentation'),(45,'Web Development'),(45,'Secure Authentication (JWT/OAuth)'),(45,'File Sharing Tools'),(46,'Moodle/LearnDash'),(46,'E-learning Best Practices'),(46,'SCORM Integration'),(47,'Video Editing'),(47,'PDF Editing'),(47,'LMS Administration'),(48,'LMS Plugin Development'),(48,'Frontend Frameworks'),(48,'Data Storage'),(49,'Dashboard Development'),(49,'Data Analytics'),(49,'Progress Visualization'),(50,'Web Development'),(50,'User Authentication'),(50,'Content Upload Management');
/*!40000 ALTER TABLE `jobs_skills_required` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `invoice_id` int DEFAULT NULL,
  `job_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKl47voew86sykgmhipjbx4cjru` (`invoice_id`),
  KEY `FKe4k520tx4er95e0qo6githu53` (`job_id`),
  CONSTRAINT `FKe4k520tx4er95e0qo6githu53` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`),
  CONSTRAINT `FKpl6r99hnisflkbylyhfybtsih` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sender_name` varchar(255) DEFAULT NULL,
  `timestamp` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `freelancer_id` int NOT NULL,
  `client_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKxfktj810ps70cflv5kc33lc9` (`freelancer_id`),
  KEY `FKf7q5hojjvwur2xro7741461is` (`client_id`),
  CONSTRAINT `FKf7q5hojjvwur2xro7741461is` FOREIGN KEY (`client_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKxfktj810ps70cflv5kc33lc9` FOREIGN KEY (`freelancer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `portfolio_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `portfolio_image` varchar(255) DEFAULT NULL,
  `portfolio_title` varchar(255) DEFAULT NULL,
  `skills` varbinary(255) DEFAULT NULL,
  `profile_id` int DEFAULT NULL,
  PRIMARY KEY (`portfolio_id`),
  KEY `FK287b73hkdki3hyg1n5pik4gsm` (`profile_id`),
  CONSTRAINT `FK287b73hkdki3hyg1n5pik4gsm` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_skills`
--

DROP TABLE IF EXISTS `portfolio_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio_skills` (
  `portfolio_portfolio_id` int NOT NULL,
  `skills` varchar(255) DEFAULT NULL,
  KEY `FK4f5h3bkovxtlnsqjfr65cusuo` (`portfolio_portfolio_id`),
  CONSTRAINT `FK4f5h3bkovxtlnsqjfr65cusuo` FOREIGN KEY (`portfolio_portfolio_id`) REFERENCES `portfolio` (`portfolio_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_skills`
--

LOCK TABLES `portfolio_skills` WRITE;
/*!40000 ALTER TABLE `portfolio_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `portfolio_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `field_of_work` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `hourly_rate` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_verified` bit(1) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','REJECTED','VERIFIED') DEFAULT NULL,
  `why_rejected` varchar(255) DEFAULT NULL,
  `bank_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK9d5dpsf2ufa6rjbi3y0elkdcd` (`email`),
  UNIQUE KEY `UK6w9t8d6j245814fo1ndw8s3ps` (`bank_id`),
  CONSTRAINT `FKm9n0p9sgio4jqxctcxm3getk9` FOREIGN KEY (`bank_id`) REFERENCES `bank_details` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'','New York, USA','Experienced web developer specializing in front-end technologies.','webdevpro23@example.com','Web Development','John','50','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745298526/zt6tuumaxmkgkkiv8ubx.jpg',_binary '\0','Doe','+1234567890','PENDING',NULL,1),(2,'','Los Angeles, USA','Creative graphic designer with expertise in branding and UI/UX design.','graphicartist99@example.com','Graphic Design','Jane','45','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745299616/zhkezqjekktqdcrnidwu.jpg',_binary '\0','Smith','+1987654321','PENDING',NULL,2),(3,'','Maharashtra, India','Professional content writer crafting engaging articles, blogs, and marketing copy.','contentwriterx@example.com','Content Writing','Michael','35','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745300213/l1je9l4lhjzanzxgtk6z.jpg',_binary '\0','Brown','+15554443333','PENDING',NULL,3),(4,'','New South Wales, Australia','Digital marketing expert with a focus on social media campaigns and SEO strategies.','marketingguru88@example.com','Digital Marketing','Emily','60','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745300975/gy46yjfqljkoz0i80zmt.jpg',_binary '\0','Johnson','+14443332222','PENDING',NULL,4),(5,'RankBoost Digital','Île-de-France, France','An experienced SEO specialist with expertise in improving search engine rankings and driving organic traffic.','seospecialist2023@example.com','Search Engine Optimization','Alex','50','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745301338/r8juippt38g24jgqvil1.jpg',_binary '\0','Johnson','+1234567890','PENDING',NULL,5),(6,'Creative Vision Media','Dhaka, Bangladesh','A creative video editor with a passion for storytelling and producing high-quality video content.','videoeditorpro@example.com','Video Production','Sophia','60','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745302268/bfvp3f9f6kddhsuplgw3.jpg',_binary '\0','Martinez','+1987654321','PENDING',NULL,6),(7,'UserFlow Studio','Jakarta, Indonesia','A skilled UX designer focused on creating intuitive and user-friendly digital experiences.','uxdesignermax@example.com','User Experience Design','Ethan','70','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745303410/qujewtch03e5rkiqz2u5.jpg',_binary '\0','Taylor','+15554443333','PENDING',NULL,7),(8,'AppGenius Tech','São Paulo, Brazil','An expert app developer specializing in building robust and scalable mobile applications.','appdevmaster@example.com','Mobile Application Development','Emma','80','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745303605/e87rizrwzdmoepz7oyil.webp',_binary '\0','Clark','+14443332222','PENDING',NULL,8),(9,'Engage Digital','Beijing, China','A social media strategist with a knack for creating engaging content and growing online communities.','socialmediaexpert@example.com','Social Media Marketing','Liam','55','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745303709/edylvoh3edfroywjrmmo.webp',_binary '\0','Wilson','+16665554444','PENDING',NULL,9),(10,'Capture Moments Studio','Istanbul, Turkey','A talented freelance photographer capturing moments with creativity and precision.','freelancephotographer@example.com','Photography','Olivia','65','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745303775/tere7qpsj6wreixiijy0.webp',_binary '\0','Brown','+17778889999','PENDING',NULL,10),(11,'Tech Startup Inc.','Silicon Valley, USA','A fast-growing tech startup looking for skilled developers to build innovative solutions.','ceo@techstartup.com','Technology','Tech','50','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745304447/xxanupzi8fsvizwlg38x.jpg',_binary '\0','Startup','+11112223333','PENDING',NULL,11),(12,'Marketing Agency HQ','London,UK','A leading marketing agency seeking creative designers and writers for client projects.','hq@marketingagency.com','Marketing','Marketing','55','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745304572/m69kdy8vrpxnjuaztjni.jpg',_binary '\0','Agency','+12223334444','PENDING',NULL,12),(13,'E-Commerce Store','Toranto,Canada','An entrepreneur building an online store and looking for developers and marketers.','entrepreneur@ecommercestore.com','E-Commerce','E-Commerce','60','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745304641/sz8kbzmnc3idrrewyxkw.jpg',_binary '\0','Entrepreneur','+13334445555','PENDING',NULL,13),(14,'Design Studio LLC','Jaipur,India','A design studio hiring freelance artists and designers for client projects.','manager@designstudio.com','Design','Design','66','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745304722/gyhf3laznw7upkikpja3.jpg',_binary '\0','Studio','+14445556666','PENDING',NULL,14),(15,'Small Biz Enterprise','Victoria, Australia','Owner of a small business seeking freelancers to help with website development and marketing.','owner@smallbizenterprise.com','Business','Small','72','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745304780/yy9r2vvioeljjpf4pnml.jpg',_binary '\0','Business','+15556667777','PENDING',NULL,15),(16,'Digital Ad Agency','Paris, France','A professional in digital advertising seeking experts for creative ad campaigns.','pro@digitaladagency.com','Advertising','Digital','100','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745304930/zgwekptdb66ybd1cvm3k.jpg',_binary '\0','Ad Agency','+16667778888','PENDING',NULL,16),(17,'Consulting Firm','Chittagong, Bangladesh','A consulting firm looking for experts to help in business strategy and market analysis.','ceo@consultingfirm.com','Consulting','Consulting','354','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745305070/eueiosafsnfrvjdeyokc.png',_binary '\0','Firm','+17778889999','PENDING',NULL,17),(18,'Real Estate Co.','Shanghai, China','A developer looking for skilled professionals to help with real estate projects.','developer@realestateco.com','Real Estate','Real Estate','256','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745305127/przlodbq45hi6j85cnuj.jpg',_binary '\0','Developer','+18889990000','PENDING',NULL,18),(19,'Healthcare Clinic','Rio de Janeiro, Brazil','Admin of a healthcare clinic seeking freelancers for clinic management and marketing.','admin@healthcareclinic.com','Healthcare','Healthcare','56','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745305171/d6tufoo2w6vxlwzcyayn.jpg',_binary '\0','Clinic','+19990001111','PENDING',NULL,19),(20,'Education Institute','Madrid, Spain','Director of an educational institute seeking talented educators and administrators.','director@educationinstitute.com','Education','Education','125','http://res.cloudinary.com/dcnlmcvrr/image/upload/v1745305225/vt6utmmseqqvf4uzpdgl.jpg',_binary '\0','Institute','+20001122333','PENDING',NULL,20),(21,NULL,'Manila, Philippines','Website designer with a passion for clean and responsive design.','rajesh.kumar@gmail.com','Website Designers','Liam','500','https://randomuser.me/api/portraits/men/75.jpg',_binary '','Anderson','9876543210','VERIFIED',NULL,25),(22,NULL,'Manchester, United Kingdom','Graphic designer with 5+ years of creative brand projects.','sneha.patel@gmail.com','Graphic Designers','Emily','450','https://randomuser.me/api/portraits/women/65.jpg',_binary '','Watson','9876501234','VERIFIED',NULL,26),(23,NULL,'British Columbia, Canada','Experienced full-stack software developer.','vikram.singh@gmail.com','Software Developers','Ethan','550','https://randomuser.me/api/portraits/men/41.jpg',_binary '','Bennett','9876523456','VERIFIED',NULL,27),(24,NULL,'Gujarat, India','Creative 3D artist for product visualizations and animations.','meera.shah@gmail.com','3D Artists','Sophie','520','https://randomuser.me/api/portraits/women/39.jpg',_binary '','Martinez','9876534567','VERIFIED',NULL,28),(25,NULL,'Victoria, Australia','Mobile app developer with Android and Flutter expertise.','anil.mehta@gmail.com','Mobile App Developers','Noah','530','https://randomuser.me/api/portraits/men/50.jpg',_binary '','Schmidt','9876545678','VERIFIED',NULL,29),(26,NULL,'Paris, France','Illustrator creating digital artworks and storyboards.','pooja.rathod@gmail.com','Illustration','Olivia','470','https://randomuser.me/api/portraits/women/70.jpg',_binary '','Garcia','9876556789','VERIFIED',NULL,30),(27,NULL,'Chittagong, Bangladesh','Website designer specializing in eCommerce platforms.','yash.verma@gmail.com','Website Designers','Lucas','480','https://randomuser.me/api/portraits/men/22.jpg',_binary '','Wilson','9876567890','VERIFIED',NULL,31),(28,NULL,'Bali, Indonesia','Graphic designer with expertise in brand identity.','neha.joshi@gmail.com','Graphic Designers','Ava','460','https://randomuser.me/api/portraits/women/21.jpg',_binary '','Miller','9876578901','VERIFIED',NULL,32),(29,NULL,'Rio de Janeiro, Brazil','Mobile app developer with a focus on cross-platform apps.','karan.dave@gmail.com','Mobile App Developers','Mason','500','https://randomuser.me/api/portraits/men/33.jpg',_binary '','Evans','9876589012','VERIFIED',NULL,33),(30,NULL,'Shanghai, China','Software developer with expertise in backend systems.','manish.prajapati@gmail.com','Software Developers','Isabella','550','https://randomuser.me/api/portraits/women/29.jpg',_binary '','Turner','9876590123','VERIFIED',NULL,34),(31,NULL,'California, USA','Full-stack web developer.','liamanderson23@gmail.com','Web Development','Liam','45','https://randomuser.me/api/portraits/men/1.jpg',_binary '','Anderson','9876543210','VERIFIED',NULL,NULL),(32,NULL,'Manchester, United Kingdom','Graphic designer with a passion for minimalistic design.','emilywatson88@gmail.com','Graphic Design','Emily','50','https://randomuser.me/api/portraits/women/2.jpg',_binary '','Watson','8765432109','VERIFIED',NULL,NULL),(33,NULL,'Illinois, USA','SEO expert and content creator.','ethanbennett01@gmail.com','SEO and Content Writing','Ethan','40','https://randomuser.me/api/portraits/men/3.jpg',_binary '','Bennett','7654321098','VERIFIED',NULL,NULL),(34,NULL,'Madrid, Spain','UX/UI designer with a focus on mobile apps.','sophiemartinez07@gmail.com','UI/UX Design','Sophie','55','https://randomuser.me/api/portraits/women/3.jpg',_binary '','Martinez','6543219870','VERIFIED',NULL,NULL),(35,NULL,'Berlin, Germany','Experienced video editor and animator.','noahschmidt12@gmail.com','Video Editing','Noah','60','https://randomuser.me/api/portraits/men/4.jpg',_binary '','Schmidt','6549873210','VERIFIED',NULL,NULL),(36,NULL,'Victoria, Australia','Social media expert and influencer.','oliviagarcia95@gmail.com','Social Media Marketing','Olivia','50','https://randomuser.me/api/portraits/women/4.jpg',_binary '','Garcia','7321098765','VERIFIED',NULL,NULL),(37,NULL,'Seattle, USA','Mobile app developer and entrepreneur.','lucaswilson09@gmail.com','Mobile Development','Lucas','65','https://randomuser.me/api/portraits/men/5.jpg',_binary '','Wilson','3216549870','VERIFIED',NULL,NULL),(38,NULL,'Queensland, Australia','Graphic designer with expertise in brand identity.','avamiller13@gmail.com','Graphic Design','Ava','52','https://randomuser.me/api/portraits/women/5.jpg',_binary '','Miller','4321098765','VERIFIED',NULL,NULL),(39,NULL,'São Paulo, Brazil','Full-stack developer with a passion for AI.','masonevans45@gmail.com','Software Development','Mason','70','https://randomuser.me/api/portraits/men/6.jpg',_binary '','Evans','5432109876','VERIFIED',NULL,NULL),(40,NULL,'Istanbul, Turkey','Expert digital marketer focused on branding.','isabellaturner19@gmail.com','Digital Marketing','Isabella','75','https://randomuser.me/api/portraits/women/6.jpg',_binary '','Turner','3216549870','VERIFIED',NULL,NULL),(41,NULL,'London, United Kingdom','Experienced project manager in tech companies.','harrymorgan92@gmail.com','Project Management','Harry','80','https://randomuser.me/api/portraits/men/7.jpg',_binary '','Morgan','9876543210','VERIFIED',NULL,NULL),(42,NULL,'Ontario, Canada','Freelance writer specializing in tech content.','lucypatterson33@gmail.com','Content Writing','Lucy','45','https://randomuser.me/api/portraits/women/7.jpg',_binary '','Patterson','8765432109','VERIFIED',NULL,NULL),(43,NULL,'Gujarat, India','Software engineer specializing in Java.','nathanreed14@gmail.com','Software Engineering','Nathan','55','https://randomuser.me/api/portraits/men/8.jpg',_binary '','Reed','4321098765','VERIFIED',NULL,NULL),(44,NULL,'Manila, Philippines','Graphic designer with a focus on branding.','miabailey76@gmail.com','Graphic Design','Mia','65','https://randomuser.me/api/portraits/women/8.jpg',_binary '','Bailey','4321098765','VERIFIED',NULL,NULL),(45,NULL,'New York, USA','Experienced app developer with a focus on iOS apps.','loganwright65@gmail.com','App Development','Logan','75','https://randomuser.me/api/portraits/men/9.jpg',_binary '','Wright','6543210987','VERIFIED',NULL,NULL),(46,NULL,'Sydney, Australia','UX/UI designer with a passion for user-centered design.','ameliaperry21@gmail.com','UX/UI Design','Amelia','70','https://randomuser.me/api/portraits/women/9.jpg',_binary '','Perry','3210987654','VERIFIED',NULL,NULL),(47,NULL,'Manchester, United Kingdom','SEO expert helping brands improve their online presence.','jameskelly90@gmail.com','SEO','James','80','https://randomuser.me/api/portraits/men/10.jpg',_binary '','Kelly','8765432109','VERIFIED',NULL,NULL),(48,NULL,'Chittagong, Bangladesh','Content strategist with a focus on digital content creation.','charlotteeva08@gmail.com','Content Strategy','Charlotte','60','https://randomuser.me/api/portraits/women/10.jpg',_binary '','Evans','5678901234','VERIFIED',NULL,NULL),(49,NULL,'São Paulo, Brazil','Experienced marketing consultant focused on growth strategies.','henryking56@gmail.com','Marketing','Henry','85','https://randomuser.me/api/portraits/men/11.jpg',_binary '','King','7890123456','VERIFIED',NULL,NULL),(50,NULL,'Rio de Janeiro, Brazil','Experienced digital content creator and social media manager.','gracecampbell77@gmail.com','Social Media','Grace','65','https://randomuser.me/api/portraits/women/11.jpg',_binary '','Campbell','6789012345','VERIFIED',NULL,NULL),(51,NULL,'Victoria, Australia','Freelance photographer with a passion for outdoor shoots.','jackthomas29@gmail.com','Photography','Jack','75','https://randomuser.me/api/portraits/men/12.jpg',_binary '','Thomas','7894561230','VERIFIED',NULL,NULL),(52,NULL,'Shanghai, China','Web designer with expertise in UI/UX and front-end development.','sophiaallen82@gmail.com','Web Design','Sophia','95','https://randomuser.me/api/portraits/women/12.jpg',_binary '','Allen','5647382910','VERIFIED',NULL,NULL),(53,NULL,'Manila, Philippines','Expert in digital marketing and online advertising campaigns.','williammoore63@gmail.com','Digital Marketing','William','85','https://randomuser.me/api/portraits/men/13.jpg',_binary '','Moore','9201846753','VERIFIED',NULL,NULL),(54,NULL,'Istanbul, Turkey','Freelance content creator specializing in travel blogs and photography.','ellascott47@gmail.com','Content Creation','Ella','60','https://randomuser.me/api/portraits/women/13.jpg',_binary '','Scott','6541239870','VERIFIED',NULL,NULL),(55,NULL,'São Paulo, Brazil','Experienced web developer with a passion for backend systems.','danielbaker17@gmail.com','Web Development','Daniel','120','https://randomuser.me/api/portraits/men/14.jpg',_binary '','Baker','9213645780','VERIFIED',NULL,NULL),(56,NULL,'Chittagong, Bangladesh','Marketing consultant with a focus on social media strategies.','lilyturner66@gmail.com','Marketing','Lily','70','https://randomuser.me/api/portraits/women/14.jpg',_binary '','Turner','9536748201','VERIFIED',NULL,NULL),(57,NULL,'Jakarta, Indonesia','UI/UX designer with a passion for creating user-friendly apps.','oliverharris31@gmail.com','UI/UX Design','Oliver','100','https://randomuser.me/api/portraits/men/15.jpg',_binary '','Harris','9823746571','VERIFIED',NULL,NULL),(58,NULL,'Shanghai, China','Freelance photographer and videographer specializing in fashion shoots.','avamitchell12@gmail.com','Photography & Videography','Ava','110','https://randomuser.me/api/portraits/women/15.jpg',_binary '','Mitchell','7548196032','VERIFIED',NULL,NULL),(59,NULL,'Rio de Janeiro, Brazil','Software developer with extensive experience in full-stack development.','michaelwalker20@gmail.com','Software Development','Michael','130','https://randomuser.me/api/portraits/men/16.jpg',_binary '','Walker','9873456789','VERIFIED',NULL,NULL),(60,NULL,'Manila, Philippines','Content writer and editor, specializing in digital media.','emilyrobinson99@gmail.com','Content Writing','Emily','80','https://randomuser.me/api/portraits/women/16.jpg',_binary '','Robinson','9435768190','VERIFIED',NULL,NULL),(61,NULL,NULL,NULL,'user@gmail.com',NULL,NULL,NULL,'http://res.cloudinary.com/dcnlmcvrr/image/upload/v1758540806/yo1qqgkrcvz5vyon1dur.png',_binary '\0',NULL,'','PENDING',NULL,NULL);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_skills`
--

DROP TABLE IF EXISTS `profile_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_skills` (
  `profile_id` int NOT NULL,
  `skills` varchar(255) DEFAULT NULL,
  KEY `FKncwjq1byfgaqa90r6vb1miclp` (`profile_id`),
  CONSTRAINT `FKncwjq1byfgaqa90r6vb1miclp` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_skills`
--

LOCK TABLES `profile_skills` WRITE;
/*!40000 ALTER TABLE `profile_skills` DISABLE KEYS */;
INSERT INTO `profile_skills` VALUES (1,'HTML'),(1,'CSS'),(1,'JavaScript'),(1,'React'),(3,'Content Writing'),(3,'SEO'),(3,'Copywriting'),(3,'Editing'),(2,'Adobe Photoshop'),(2,'Illustrator'),(2,'Figma'),(2,'UI/UX Design'),(4,'SEO'),(4,'Social Media Marketing'),(4,'Google Ads'),(4,'Analytics'),(5,'SEO'),(5,'Keyword Research'),(5,'On-Page Optimization'),(5,'Analytics'),(6,'Video Editing'),(6,'Adobe Premiere Pro'),(6,'After Effects'),(6,'Color Grading'),(7,'UX Design'),(7,'Wireframing'),(7,'Prototyping'),(7,'User Research'),(8,'Mobile App Development'),(8,'React Native'),(8,'Flutter'),(8,'Swift'),(9,'Social Media Management'),(9,'Content Strategy'),(9,'Community Building'),(9,'Analytics'),(10,'Photography'),(10,'Photo Editing'),(10,'Lighting Techniques'),(10,'Portrait Photography'),(12,'Digital Marketing'),(12,'Content Writing'),(12,'SEO'),(12,'Branding'),(12,'Social Media Management'),(13,'E-Commerce'),(13,'Web Development'),(13,'SEO'),(13,'Online Marketing'),(13,'Product Management'),(14,'Graphic Design'),(14,'UX/UI Design'),(14,'Illustration'),(14,'Adobe Creative Suite'),(14,'Branding'),(15,'Small Business Marketing'),(15,'E-Commerce'),(15,'Website Development'),(15,'Branding'),(15,'Customer Service'),(16,'Digital Advertising'),(16,'PPC Campaigns'),(16,'SEO'),(16,'Social Media Marketing'),(16,'Ad Design'),(17,'Business Strategy'),(17,'Market Analysis'),(17,'Consulting'),(17,'Leadership'),(17,'Financial Planning'),(18,'Real Estate Development'),(18,'Project Management'),(18,'Construction Management'),(18,'Real Estate Marketing'),(18,'Negotiation'),(19,'Healthcare Administration'),(19,'Medical Marketing'),(19,'Patient Care'),(19,'Healthcare Compliance'),(19,'Operations Management'),(20,'Education Management'),(20,'Curriculum Development'),(20,'Teacher Training'),(20,'Leadership'),(20,'Educational Technology'),(11,'Digital Marketing'),(11,'Content Writing'),(11,'SEO'),(11,'Branding'),(11,'Social Media Management'),(22,'Adobe Photoshop'),(22,'Adobe Illustrator'),(22,'Logo Design'),(22,'UI/UX Design'),(22,'Canva'),(22,'Branding'),(22,'Poster Design'),(21,'HTML'),(21,'CSS'),(21,'JavaScript'),(21,'React'),(21,'Figma'),(21,'Bootstrap'),(21,'Responsive Design'),(23,'Java'),(23,'Spring Boot'),(23,'MySQL'),(23,'Hibernate'),(23,'REST APIs'),(23,'Git'),(23,'JUnit'),(24,'Blender'),(24,'3D Modeling'),(24,'Texturing'),(24,'Lighting'),(24,'Animation'),(24,'Rendering'),(24,'Character Rigging'),(25,'Flutter'),(25,'Android'),(25,'Dart'),(25,'Firebase'),(25,'REST API Integration'),(25,'SQLite'),(25,'UI Design'),(26,'Digital Illustration'),(26,'Concept Art'),(26,'Storyboarding'),(26,'Procreate'),(26,'Color Theory'),(26,'Character Design'),(26,'Sketching'),(27,'WordPress'),(27,'HTML'),(27,'CSS'),(27,'JavaScript'),(27,'WooCommerce'),(27,'SEO Basics'),(27,'Adobe XD'),(28,'Adobe Illustrator'),(28,'CorelDRAW'),(28,'Typography'),(28,'Flyer Design'),(28,'Adobe InDesign'),(28,'Banner Design'),(28,'Photo Editing'),(29,'React Native'),(29,'Android Studio'),(29,'Redux'),(29,'API Integration'),(29,'JavaScript'),(29,'Push Notifications'),(29,'Firebase'),(30,'Python'),(30,'Django'),(30,'PostgreSQL'),(30,'REST Framework'),(30,'GitHub'),(30,'Unit Testing'),(30,'Docker'),(30,'Celery'),(31,'Java'),(31,'Spring Boot'),(31,'MySQL'),(31,'REST APIs'),(31,'Docker'),(31,'AWS'),(32,'Content Writing'),(32,'SEO'),(32,'Copywriting'),(32,'Social Media Content'),(32,'Blogging'),(32,'Proofreading'),(33,'ReactJS'),(33,'JavaScript'),(33,'NodeJS'),(33,'MongoDB'),(33,'Firebase'),(33,'Git'),(34,'Graphic Design'),(34,'Adobe Photoshop'),(34,'Adobe Illustrator'),(34,'UI Design'),(34,'Logo Design'),(34,'Canva'),(35,'Digital Marketing'),(35,'Google Ads'),(35,'SEO'),(35,'Facebook Ads'),(35,'Lead Generation'),(35,'Email Marketing'),(36,'Python'),(36,'Django'),(36,'REST APIs'),(36,'PostgreSQL'),(36,'AWS'),(36,'Docker'),(37,'Video Editing'),(37,'Adobe Premiere Pro'),(37,'After Effects'),(37,'Final Cut Pro'),(37,'YouTube Content'),(37,'Motion Graphics'),(38,'UI/UX Design'),(38,'Figma'),(38,'Sketch'),(38,'Adobe XD'),(38,'Wireframing'),(38,'Prototyping'),(39,'Android Development'),(39,'Kotlin'),(39,'Firebase'),(39,'Android Studio'),(39,'Material Design'),(39,'SQLite'),(40,'Photography'),(40,'Photo Editing'),(40,'Adobe Lightroom'),(40,'Portrait Photography'),(40,'Event Photography'),(40,'Product Photography'),(41,'Python'),(41,'Flask'),(41,'REST APIs'),(41,'SQL'),(41,'Machine Learning'),(41,'Git'),(42,'JavaScript'),(42,'HTML5'),(42,'CSS3'),(42,'ReactJS'),(42,'NextJS'),(42,'Tailwind CSS'),(43,'Accounting'),(43,'QuickBooks'),(43,'Tax Filing'),(43,'Financial Reporting'),(43,'Payroll'),(43,'Budgeting'),(44,'Social Media Marketing'),(44,'Content Strategy'),(44,'Influencer Marketing'),(44,'Instagram Ads'),(44,'Facebook Ads'),(44,'Analytics'),(45,'Full Stack Development'),(45,'NodeJS'),(45,'ExpressJS'),(45,'MongoDB'),(45,'ReactJS'),(45,'Docker'),(46,'Public Speaking'),(46,'Training Facilitation'),(46,'Workshop Design'),(46,'Leadership Coaching'),(46,'Mentoring'),(46,'Soft Skills Training'),(47,'Translation'),(47,'Transcription'),(47,'Proofreading'),(47,'Content Localization'),(47,'Subtitling'),(47,'Voice Over'),(48,'WordPress'),(48,'WooCommerce'),(48,'Elementor'),(48,'SEO Optimization'),(48,'cPanel'),(48,'PHP Basics'),(49,'Data Analysis'),(49,'Excel'),(49,'Tableau'),(49,'Power BI'),(49,'SQL'),(49,'Data Visualization'),(50,'Virtual Assistance'),(50,'Admin Support'),(50,'Email Management'),(50,'Scheduling'),(50,'Data Entry'),(50,'Customer Support'),(51,'Shopify Development'),(51,'Liquid Templating'),(51,'SEO'),(51,'Ecommerce Setup'),(51,'Product Listing'),(51,'Theme Customization'),(52,'AWS'),(52,'CloudFormation'),(52,'EC2'),(52,'S3'),(52,'Lambda'),(52,'CloudWatch'),(53,'C++'),(53,'Data Structures'),(53,'Competitive Programming'),(53,'Algorithms'),(53,'OOP Concepts'),(53,'Problem Solving'),(54,'Legal Writing'),(54,'Contract Drafting'),(54,'Policy Research'),(54,'Compliance Advisory'),(54,'Document Review'),(54,'Corporate Law'),(55,'Illustration'),(55,'Character Design'),(55,'Comics Creation'),(55,'Storyboarding'),(55,'Digital Art'),(55,'Adobe Illustrator'),(56,'Copywriting'),(56,'Ad Copywriting'),(56,'Email Marketing Copy'),(56,'Landing Page Copy'),(56,'Product Descriptions'),(56,'Blog Copy'),(57,'Data Science'),(57,'Python'),(57,'Pandas'),(57,'Machine Learning'),(57,'Scikit-learn'),(57,'Numpy'),(58,'2D Animation'),(58,'After Effects'),(58,'Adobe Animate'),(58,'Character Rigging'),(58,'Motion Design'),(58,'Explainer Videos'),(59,'Audio Editing'),(59,'Podcast Editing'),(59,'Audacity'),(59,'Noise Reduction'),(59,'Audio Mixing'),(59,'Sound Effects'),(60,'Laravel'),(60,'PHP'),(60,'MySQL'),(60,'REST APIs'),(60,'Blade Templates'),(60,'VueJS');
/*!40000 ALTER TABLE `profile_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposals`
--

DROP TABLE IF EXISTS `proposals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proposals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bid` bigint DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `finishing_time` datetime(6) DEFAULT NULL,
  `freelancer_email` varchar(255) DEFAULT NULL,
  `freelancer_name` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `status` enum('HIRED') DEFAULT NULL,
  `job_id` int NOT NULL,
  `freelancer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfomh9vfrupnwuj2w2wopiuech` (`job_id`),
  KEY `FK4vkcxnnj42d7jpd0q6vemvb5h` (`freelancer_id`),
  CONSTRAINT `FK4vkcxnnj42d7jpd0q6vemvb5h` FOREIGN KEY (`freelancer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKfomh9vfrupnwuj2w2wopiuech` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposals`
--

LOCK TABLES `proposals` WRITE;
/*!40000 ALTER TABLE `proposals` DISABLE KEYS */;
INSERT INTO `proposals` VALUES (128,8559,'marketingAgencyHQ','Proposal description for job Social Media Ad Campaign','2025-05-06 11:00:56.000000','contentwriterx@example.com','contentWriterX','Social Media Ad Campaign','HIRED',1,3),(129,3569,'marketingAgencyHQ','Proposal description for job Social Media Ad Campaign','2025-05-06 11:00:56.000000','videoeditorpro@example.com','videoEditorPro','Social Media Ad Campaign',NULL,1,6),(130,1169,'marketingAgencyHQ','Proposal description for job Social Media Ad Campaign','2025-05-06 11:00:56.000000','socialmediaexpert@example.com','socialMediaExpert','Social Media Ad Campaign',NULL,1,9),(131,4137,'marketingAgencyHQ','Proposal description for job Social Media Ad Campaign','2025-05-06 11:00:56.000000','emilywatson88@gmail.com','emilyWatson88','Social Media Ad Campaign',NULL,1,32),(132,6180,'marketingAgencyHQ','Proposal description for job Social Media Ad Campaign','2025-05-06 11:00:56.000000','noahschmidt12@gmail.com','noahSchmidt12','Social Media Ad Campaign',NULL,1,35),(133,7491,'marketingAgencyHQ','Proposal description for job SEO Optimization for Website','2025-05-06 11:00:56.000000','contentwriterx@example.com','contentWriterX','SEO Optimization for Website',NULL,2,3),(134,7912,'marketingAgencyHQ','Proposal description for job SEO Optimization for Website','2025-05-06 11:00:56.000000','marketingguru88@example.com','marketingGuru88','SEO Optimization for Website',NULL,2,4),(135,6091,'marketingAgencyHQ','Proposal description for job SEO Optimization for Website','2025-05-06 11:00:56.000000','seospecialist2023@example.com','seoSpecialist2023','SEO Optimization for Website',NULL,2,5),(136,5717,'marketingAgencyHQ','Proposal description for job SEO Optimization for Website','2025-05-06 11:00:56.000000','emilywatson88@gmail.com','emilyWatson88','SEO Optimization for Website',NULL,2,32),(137,9311,'marketingAgencyHQ','Proposal description for job SEO Optimization for Website','2025-05-06 11:00:56.000000','noahschmidt12@gmail.com','noahSchmidt12','SEO Optimization for Website',NULL,2,35),(138,8408,'marketingAgencyHQ','Proposal description for job Brand Strategy Development','2025-05-06 11:00:56.000000','sneha.patel@gmail.com','emily_watson','Brand Strategy Development','HIRED',3,22),(139,3105,'marketingAgencyHQ','Proposal description for job Brand Strategy Development','2025-05-06 11:00:56.000000','sophiemartinez07@gmail.com','sophieMartinez07','Brand Strategy Development',NULL,3,34),(140,9303,'marketingAgencyHQ','Proposal description for job Content Marketing Strategy','2025-05-06 11:00:56.000000','emilywatson88@gmail.com','emilyWatson88','Content Marketing Strategy',NULL,5,32),(141,6202,'eCommerceEntrepreneur','Proposal description for job Website Design','2025-05-06 11:00:56.000000','webdevpro23@example.com','webDevPro23','Website Design',NULL,6,1),(142,2101,'eCommerceEntrepreneur','Proposal description for job Website Design','2025-05-06 11:00:56.000000','graphicartist99@example.com','graphicArtist99','Website Design',NULL,6,2),(143,10898,'eCommerceEntrepreneur','Proposal description for job Website Design','2025-05-06 11:00:56.000000','uxdesignermax@example.com','uxDesignerMax','Website Design',NULL,6,7),(144,7186,'eCommerceEntrepreneur','Proposal description for job Website Design','2025-05-06 11:00:56.000000','rajesh.kumar@gmail.com','liam_anderson','Website Design',NULL,6,21),(145,2239,'eCommerceEntrepreneur','Proposal description for job Website Design','2025-05-06 11:00:56.000000','sneha.patel@gmail.com','emily_watson','Website Design',NULL,6,22),(146,8636,'eCommerceEntrepreneur','Proposal description for job Product Photography','2025-05-06 11:00:56.000000','graphicartist99@example.com','graphicArtist99','Product Photography',NULL,7,2),(147,5464,'eCommerceEntrepreneur','Proposal description for job Product Photography','2025-05-06 11:00:56.000000','appdevmaster@example.com','appDevMaster','Product Photography',NULL,7,8),(148,10411,'eCommerceEntrepreneur','Proposal description for job Product Photography','2025-05-06 11:00:56.000000','sneha.patel@gmail.com','emily_watson','Product Photography',NULL,7,22),(149,4667,'eCommerceEntrepreneur','Proposal description for job Product Photography','2025-05-06 11:00:56.000000','anil.mehta@gmail.com','noah_schmidt','Product Photography',NULL,7,25),(150,1099,'eCommerceEntrepreneur','Proposal description for job Product Photography','2025-05-06 11:00:56.000000','karan.dave@gmail.com','mason_evans','Product Photography',NULL,7,29),(151,10497,'eCommerceEntrepreneur','Proposal description for job Social Media Management','2025-05-06 11:00:56.000000','gracecampbell77@gmail.com','graceCampbell77','Social Media Management',NULL,9,50),(152,8189,'designStudioManager','Proposal description for job Logo Design','2025-05-06 11:00:56.000000','videoeditorpro@example.com','videoEditorPro','Logo Design',NULL,11,6),(153,8452,'designStudioManager','Proposal description for job Logo Design','2025-05-06 11:00:56.000000','lucaswilson09@gmail.com','lucasWilson09','Logo Design',NULL,11,37),(154,6694,'designStudioManager','Proposal description for job Logo Design','2025-05-06 11:00:56.000000','avamitchell12@gmail.com','avaMitchell12','Logo Design',NULL,11,58),(155,7115,'designStudioManager','Proposal description for job Logo Design','2025-05-06 11:00:56.000000','michaelwalker20@gmail.com','michaelWalker20','Logo Design',NULL,11,59),(156,4492,'designStudioManager','Proposal description for job Website Redesign','2025-05-06 11:00:56.000000','gracecampbell77@gmail.com','graceCampbell77','Website Redesign',NULL,12,50),(157,10115,'designStudioManager','Proposal description for job Marketing Strategy','2025-05-06 11:00:56.000000','graphicartist99@example.com','graphicArtist99','Marketing Strategy',NULL,13,2),(158,6101,'designStudioManager','Proposal description for job Marketing Strategy','2025-05-06 11:00:56.000000','sneha.patel@gmail.com','emily_watson','Marketing Strategy',NULL,13,22),(159,9159,'designStudioManager','Proposal description for job Marketing Strategy','2025-05-06 11:00:56.000000','pooja.rathod@gmail.com','olivia_garcia','Marketing Strategy',NULL,13,26),(160,6494,'designStudioManager','Proposal description for job Marketing Strategy','2025-05-06 11:00:56.000000','neha.joshi@gmail.com','ava_miller','Marketing Strategy',NULL,13,28),(161,3994,'designStudioManager','Proposal description for job Marketing Strategy','2025-05-06 11:00:56.000000','sophiemartinez07@gmail.com','sophieMartinez07','Marketing Strategy',NULL,13,34),(162,9489,'designStudioManager','Proposal description for job Content Strategy Development','2025-05-06 11:00:56.000000','seospecialist2023@example.com','seoSpecialist2023','Content Strategy Development',NULL,15,5),(163,4463,'designStudioManager','Proposal description for job Content Strategy Development','2025-05-06 11:00:56.000000','socialmediaexpert@example.com','socialMediaExpert','Content Strategy Development',NULL,15,9),(164,2850,'designStudioManager','Proposal description for job Content Strategy Development','2025-05-06 11:00:56.000000','emilywatson88@gmail.com','emilyWatson88','Content Strategy Development',NULL,15,32),(165,9861,'designStudioManager','Proposal description for job Content Strategy Development','2025-05-06 11:00:56.000000','miabailey76@gmail.com','miaBailey76','Content Strategy Development',NULL,15,44),(166,9754,'designStudioManager','Proposal description for job Content Strategy Development','2025-05-06 11:00:56.000000','jameskelly90@gmail.com','jamesKelly90','Content Strategy Development',NULL,15,47),(167,8186,'smallBizOwner89','Proposal description for job Website Development','2025-05-06 11:00:56.000000','webdevpro23@example.com','webDevPro23','Website Development',NULL,16,1),(168,10670,'smallBizOwner89','Proposal description for job Website Development','2025-05-06 11:00:56.000000','rajesh.kumar@gmail.com','liam_anderson','Website Development',NULL,16,21),(169,7794,'smallBizOwner89','Proposal description for job Website Development','2025-05-06 11:00:56.000000','yash.verma@gmail.com','lucas_wilson','Website Development',NULL,16,27),(170,5961,'smallBizOwner89','Proposal description for job Website Development','2025-05-06 11:00:56.000000','karan.dave@gmail.com','mason_evans','Website Development',NULL,16,29),(171,5425,'smallBizOwner89','Proposal description for job Website Development','2025-05-06 11:00:56.000000','ethanbennett01@gmail.com','ethanBennett01','Website Development',NULL,16,33),(172,8239,'smallBizOwner89','Proposal description for job Search Engine Optimization','2025-05-06 11:00:56.000000','seospecialist2023@example.com','seoSpecialist2023','Search Engine Optimization',NULL,17,5),(173,3921,'smallBizOwner89','Proposal description for job Branding Package','2025-05-06 11:00:56.000000','graphicartist99@example.com','graphicArtist99','Branding Package',NULL,18,2),(174,3890,'smallBizOwner89','Proposal description for job Branding Package','2025-05-06 11:00:56.000000','sneha.patel@gmail.com','emily_watson','Branding Package',NULL,18,22),(175,6686,'smallBizOwner89','Proposal description for job Branding Package','2025-05-06 11:00:56.000000','neha.joshi@gmail.com','ava_miller','Branding Package',NULL,18,28),(176,10763,'smallBizOwner89','Proposal description for job Branding Package','2025-05-06 11:00:56.000000','sophiemartinez07@gmail.com','sophieMartinez07','Branding Package',NULL,18,34),(177,2757,'smallBizOwner89','Proposal description for job Branding Package','2025-05-06 11:00:56.000000','danielbaker17@gmail.com','danielBaker17','Branding Package',NULL,18,55),(178,10494,'smallBizOwner89','Proposal description for job PPC Campaign Management','2025-05-06 11:00:56.000000','marketingguru88@example.com','marketingGuru88','PPC Campaign Management',NULL,19,4),(179,3202,'smallBizOwner89','Proposal description for job PPC Campaign Management','2025-05-06 11:00:56.000000','noahschmidt12@gmail.com','noahSchmidt12','PPC Campaign Management',NULL,19,35),(180,3529,'smallBizOwner89','Proposal description for job Email Marketing','2025-05-06 11:00:56.000000','contentwriterx@example.com','contentWriterX','Email Marketing',NULL,20,3),(181,7039,'smallBizOwner89','Proposal description for job Email Marketing','2025-05-06 11:00:56.000000','emilywatson88@gmail.com','emilyWatson88','Email Marketing',NULL,20,32),(182,3606,'smallBizOwner89','Proposal description for job Email Marketing','2025-05-06 11:00:56.000000','lilyturner66@gmail.com','lilyTurner66','Email Marketing',NULL,20,56),(183,5916,'digitalAdAgencyPro','Proposal description for job Social Media Advertising','2025-05-06 11:00:56.000000','noahschmidt12@gmail.com','noahSchmidt12','Social Media Advertising',NULL,22,35),(184,7761,'digitalAdAgencyPro','Proposal description for job Social Media Advertising','2025-05-06 11:00:56.000000','miabailey76@gmail.com','miaBailey76','Social Media Advertising',NULL,22,44),(185,10057,'digitalAdAgencyPro','Proposal description for job Event Promotion','2025-05-06 11:00:56.000000','socialmediaexpert@example.com','socialMediaExpert','Event Promotion',NULL,24,9),(186,6002,'digitalAdAgencyPro','Proposal description for job Event Promotion','2025-05-06 11:00:56.000000','noahschmidt12@gmail.com','noahSchmidt12','Event Promotion',NULL,24,35),(187,8839,'consultingFirmCEO','Proposal description for job Mobile App UI Design','2025-05-06 11:00:56.000000','uxdesignermax@example.com','uxDesignerMax','Mobile App UI Design',NULL,26,7),(188,5192,'consultingFirmCEO','Proposal description for job Mobile App UI Design','2025-05-06 11:00:56.000000','avamiller13@gmail.com','avaMiller13','Mobile App UI Design',NULL,26,38),(189,8441,'consultingFirmCEO','Proposal description for job Flutter App Development','2025-05-06 11:00:56.000000','appdevmaster@example.com','appDevMaster','Flutter App Development',NULL,27,8),(190,5629,'consultingFirmCEO','Proposal description for job Flutter App Development','2025-05-06 11:00:56.000000','vikram.singh@gmail.com','ethan_bennett','Flutter App Development',NULL,27,23),(191,1822,'consultingFirmCEO','Proposal description for job Flutter App Development','2025-05-06 11:00:56.000000','anil.mehta@gmail.com','noah_schmidt','Flutter App Development',NULL,27,25),(192,1226,'consultingFirmCEO','Proposal description for job Flutter App Development','2025-05-06 11:00:56.000000','karan.dave@gmail.com','mason_evans','Flutter App Development',NULL,27,29),(193,9665,'consultingFirmCEO','Proposal description for job Flutter App Development','2025-05-06 11:00:56.000000','liamanderson23@gmail.com','liamAnderson23','Flutter App Development',NULL,27,31),(194,3646,'consultingFirmCEO','Proposal description for job API Integration for App','2025-05-06 11:00:56.000000','vikram.singh@gmail.com','ethan_bennett','API Integration for App',NULL,30,23),(195,8237,'consultingFirmCEO','Proposal description for job API Integration for App','2025-05-06 11:00:56.000000','liamanderson23@gmail.com','liamAnderson23','API Integration for App',NULL,30,31),(196,9248,'consultingFirmCEO','Proposal description for job API Integration for App','2025-05-06 11:00:56.000000','oliviagarcia95@gmail.com','oliviaGarcia95','API Integration for App',NULL,30,36),(197,10530,'consultingFirmCEO','Proposal description for job API Integration for App','2025-05-06 11:00:56.000000','harrymorgan92@gmail.com','harryMorgan92','API Integration for App',NULL,30,41),(198,3904,'consultingFirmCEO','Proposal description for job API Integration for App','2025-05-06 11:00:56.000000','emilyrobinson99@gmail.com','emilyRobinson99','API Integration for App',NULL,30,60),(199,6931,'realEstateDeveloper','Proposal description for job Sales Dashboard Development','2025-05-06 11:00:56.000000','harrymorgan92@gmail.com','harryMorgan92','Sales Dashboard Development',NULL,31,41),(200,1943,'realEstateDeveloper','Proposal description for job Sales Dashboard Development','2025-05-06 11:00:56.000000','henryking56@gmail.com','henryKing56','Sales Dashboard Development',NULL,31,49),(201,7925,'realEstateDeveloper','Proposal description for job Customer Analytics','2025-05-06 11:00:56.000000','harrymorgan92@gmail.com','harryMorgan92','Customer Analytics',NULL,32,41),(202,2793,'realEstateDeveloper','Proposal description for job Customer Analytics','2025-05-06 11:00:56.000000','henryking56@gmail.com','henryKing56','Customer Analytics',NULL,32,49),(203,9193,'realEstateDeveloper','Proposal description for job Marketing Campaign Analysis','2025-05-06 11:00:56.000000','henryking56@gmail.com','henryKing56','Marketing Campaign Analysis',NULL,34,49),(204,6586,'realEstateDeveloper','Proposal description for job Database Optimization','2025-05-06 11:00:56.000000','harrymorgan92@gmail.com','harryMorgan92','Database Optimization',NULL,35,41),(205,4351,'realEstateDeveloper','Proposal description for job Database Optimization','2025-05-06 11:00:56.000000','henryking56@gmail.com','henryKing56','Database Optimization',NULL,35,49),(206,10998,'educationInstituteDirector','Proposal description for job Delivery Route Optimization System','2025-05-06 11:00:56.000000','williammoore63@gmail.com','williamMoore63','Delivery Route Optimization System',NULL,36,53),(207,10939,'educationInstituteDirector','Proposal description for job Logistics Website Redesign','2025-05-06 11:00:56.000000','yash.verma@gmail.com','lucas_wilson','Logistics Website Redesign',NULL,37,27),(208,10700,'educationInstituteDirector','Proposal description for job Logistics Website Redesign','2025-05-06 11:00:56.000000','charlotteeva08@gmail.com','charlotteEvans08','Logistics Website Redesign',NULL,37,48),(209,9683,'educationInstituteDirector','Proposal description for job Inventory Management Tool','2025-05-06 11:00:56.000000','harrymorgan92@gmail.com','harryMorgan92','Inventory Management Tool',NULL,39,41),(210,5318,'educationInstituteDirector','Proposal description for job Inventory Management Tool','2025-05-06 11:00:56.000000','henryking56@gmail.com','henryKing56','Inventory Management Tool',NULL,39,49),(211,6541,'techStartupCEO','Proposal description for job SEO & SEM Campaign Setup','2025-05-06 11:00:56.000000','marketingguru88@example.com','marketingGuru88','SEO & SEM Campaign Setup',NULL,42,4),(212,5750,'techStartupCEO','Proposal description for job SEO & SEM Campaign Setup','2025-05-06 11:00:56.000000','noahschmidt12@gmail.com','noahSchmidt12','SEO & SEM Campaign Setup','HIRED',42,35),(213,8127,'techStartupCEO','Proposal description for job Graphic Design for Social Media','2025-05-06 11:00:56.000000','graphicartist99@example.com','graphicArtist99','Graphic Design for Social Media','HIRED',43,2),(214,2386,'techStartupCEO','Proposal description for job Graphic Design for Social Media','2025-05-06 11:00:56.000000','sneha.patel@gmail.com','emily_watson','Graphic Design for Social Media',NULL,43,22),(215,6551,'techStartupCEO','Proposal description for job Graphic Design for Social Media','2025-05-06 11:00:56.000000','sophiemartinez07@gmail.com','sophieMartinez07','Graphic Design for Social Media',NULL,43,34),(216,4597,'healthcareClinicAdmin','Proposal description for job Course Content Formatting','2025-05-06 11:00:56.000000','videoeditorpro@example.com','videoEditorPro','Course Content Formatting',NULL,47,6),(217,2331,'healthcareClinicAdmin','Proposal description for job Course Content Formatting','2025-05-06 11:00:56.000000','lucaswilson09@gmail.com','lucasWilson09','Course Content Formatting',NULL,47,37);
/*!40000 ALTER TABLE `proposals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `rating` double NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  `reviewer_name` varchar(255) DEFAULT NULL,
  `jobs_job_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FKbkjfek6bpdos9se11gbacsxn9` (`jobs_job_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
  CONSTRAINT `FKbkjfek6bpdos9se11gbacsxn9` FOREIGN KEY (`jobs_job_id`) REFERENCES `job` (`job_id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,4.2,NULL,NULL,NULL,1),(2,5,NULL,NULL,NULL,22),(3,4.6,NULL,NULL,NULL,25),(4,4.7,NULL,NULL,NULL,9),(5,4.5,NULL,NULL,NULL,55),(6,4.9,NULL,NULL,NULL,45),(7,4,NULL,NULL,NULL,23);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` varchar(255) DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `freelancer_name` varchar(255) DEFAULT NULL,
  `job_description` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `transaction_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `joining_date` date DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('CLIENT','FREELANCER') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `profile_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK1mcjtpxmwom9h9bf2q0k412e0` (`profile_id`),
  CONSTRAINT `FKof44u64o1d7scaukghm9veo23` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2025-04-22','230091','$2a$10$h6YB.aEUSxNs2GxWHKwdkOlIImbRSoYadMCFjnDavcxuQqc/40PXO','FREELANCER','webDevPro23',1),(2,'2025-04-22','261110','$2a$10$yEv0mG4z74hE4qqc4ZV4v.V3jTPzdWuaOeNPCgxHCycwEXGerwRlS','FREELANCER','graphicArtist99',2),(3,'2025-04-22','401470','$2a$10$hdK1/JVHcg0duXTswu9dqOwKcAPu8fEIDOcnJt4p9QaTpXWjfP4O6','FREELANCER','contentWriterX',3),(4,'2025-04-22','219841','$2a$10$5JzofFKsnWrOJ8Byp3U0gu/bxLAaSvrqedMrxIliCkGlnUt206ve2','FREELANCER','marketingGuru88',4),(5,'2025-04-22','771282','$2a$10$m./ihJA5WhlGqM5gAvQ0KOlgp6.fO4GP/5zVMZCO6Xz73NwOLgSlW','FREELANCER','seoSpecialist2023',5),(6,'2025-04-22','643320','$2a$10$abslZJ.BMINjE4yG63h.rue7Psmw8c0SH2YQTAYWqKaG5wI1/x.ZW','FREELANCER','videoEditorPro',6),(7,'2025-04-22','529144','$2a$10$NGMqaznl0RLCNyG.BVK6CemvZmFXqwKlMpYjtf.apdEoXaraooy86','FREELANCER','uxDesignerMax',7),(8,'2025-04-22','917172','$2a$10$7CytNs6SEdZbI2ehn2K1Ou66bPz5yvOghIlUd3xBq6kxJlLPYev3u','FREELANCER','appDevMaster',8),(9,'2025-04-22','334257','$2a$10$ULP0nBjhE6XtPg3VF7Sza.WTb/X3nS.olUwbufS.6uS7bhm1svn/a','FREELANCER','socialMediaExpert',9),(10,'2025-04-22','707024','$2a$10$CbMvhcrX/DZgdRb8vNKk2.8q0Ws.nH2HaR8rMCjoz/K5.uasy9NVW','FREELANCER','freelancePhotographer',10),(11,'2025-04-22','921106','$2a$10$YgD3TUFed7u64MTfcoW9oOTd/RDJzxAgryr0ZQbxXfBmi8wdggxbq','CLIENT','techStartupCEO',11),(12,'2025-04-22','288368','$2a$10$vAuQ.u9GIsX3Z5UU5GX91OdZpkkcUK8Dmro2AEScSnKgzztufmVLO','CLIENT','marketingAgencyHQ',12),(13,'2025-04-22','108545','$2a$10$/rNlhjXs9ckMpsENKitqauRFGPFVeMAt./LHCG2P89fFGPQJvtlWy','CLIENT','eCommerceEntrepreneur',13),(14,'2025-04-22','867145','$2a$10$p.NFIewzdJUtSq4k4z7jR.DhrqLNnHMZpxGud1c36SvUxHNVib3ou','CLIENT','designStudioManager',14),(15,'2025-04-22','860384','$2a$10$jJBjzi5m9VxxRqvwdVWSwepMZ3499.DBvpyGA/OKsrUMF7KoggBE6','CLIENT','smallBizOwner89',15),(16,'2025-04-22','117648','$2a$10$sUWpelT3geV/AsG5qt/5huwRidCeQFPm6TxD3TM8B2RMIcusbJb46','CLIENT','digitalAdAgencyPro',16),(17,'2025-04-22','825711','$2a$10$urBwgzylFcOjvOnMHO/4YeTNzDMbYXAkyk1t8qq4bgWV0jChJmvHy','CLIENT','consultingFirmCEO',17),(18,'2025-04-22','588618','$2a$10$iCsRsbj3t9DKl3pFs2T79e.SEaMOmz7bnB5atHICB3yv06TWrHuPi','CLIENT','realEstateDeveloper',18),(19,'2025-04-22','724407','$2a$10$JLMOQ34TZCv8wunMRGCIQ.aSpVYHiK4G0aJQDcfEyr0TCIk.BIiOO','CLIENT','healthcareClinicAdmin',19),(20,'2025-04-22','204168','$2a$10$FkW1bZ8WX5AxeC40DeVipeiZSQzFqDV.BCypn.YlFtmnvrPY1uEU6','CLIENT','educationInstituteDirector',20),(21,'2025-04-24','593799','$2a$10$9deM1OmhAno7kj7Ndx9nI.X1TQEJSNW4rIetr.otIruB9YOlT.HcS','FREELANCER','liam_anderson',21),(22,'2025-04-24','969353','$2a$10$4YWD1LuSlKKjZixktjIugeM0WmTMNqv9QVJZDUp0e83r/e4Pm.ROS','FREELANCER','emily_watson',22),(23,'2025-04-24','754396','$2a$10$gsXcJtLEEZcAFOZs3R.MFO1lhU7KjhhrNAlO3bGbgr9Sh7Oixn5XS','FREELANCER','ethan_bennett',23),(24,'2025-04-24','960000','$2a$10$VKbwnx7gDCMo88ubjDElROMeVxfLCn1F9ujEuGO4rwm3iX4E2G30K','FREELANCER','sophie_martinez',24),(25,'2025-04-24','155451','$2a$10$pgMXgfR.x3F7hIwKusWaEeitrWgn6KoermD/LVffIxshty26q34Ay','FREELANCER','noah_schmidt',25),(26,'2025-04-24','394576','$2a$10$3HTY61RwZRNQHpzCtWXJtey5/rAZZBnKI99RGhL0CvV.b0/LuI8pS','FREELANCER','olivia_garcia',26),(27,'2025-04-24','519442','$2a$10$sjkqS0SIG7Ha3SMdfiMbJOa1/qoGfIRuLaxjHyFhq14kbKFxj0fcO','FREELANCER','lucas_wilson',27),(28,'2025-04-24','717116','$2a$10$oYYbl4n/Sae7mjS5m4YqpO6CwAqlyuALxWvLUyiY4GcIpfppGmjsO','FREELANCER','ava_miller',28),(29,'2025-04-24','158747','$2a$10$j4BxlgtSqj0hXUkOAhuFiuoAb9du0l43xIgDjBOl3Oai/7BJcAzvu','FREELANCER','mason_evans',29),(30,'2025-04-24','245818','$2a$10$91MnI3yrngxOmbTf0VnMWO68FsFXqaOSAxErajSfpxNBrEeMuif8O','FREELANCER','isabella_turner',30),(31,'2025-04-25','516586','$2a$10$0bpxOTDvp93YUCS3D0rRXug28hKyiS12pckek4ZsowM2iN8BTqwp2','FREELANCER','liamAnderson23',31),(32,'2025-04-25','193686','$2a$10$WiVosN1pX5erQ6LK2ZI8cugfrX2ddp7Rhr.WCf93kNS1tPVxgoO1y','FREELANCER','emilyWatson88',32),(33,'2025-04-25','231486','$2a$10$k7YM20s9Xo0xHDl1DFjp1Op8oUcjbjdJieu7r.MnaQMaZL.E68V3O','FREELANCER','ethanBennett01',33),(34,'2025-04-25','973602','$2a$10$lMMoQ2d62LmfjoCh//UIfu6xW9Ilhs0LUJFDfNAC5RX4qg9TyZaW6','FREELANCER','sophieMartinez07',34),(35,'2025-04-25','834528','$2a$10$4KF9gfQn39V08uKushHM.eoRnNKf757Z5ftIsYcrpoPh6iffQfcbe','FREELANCER','noahSchmidt12',35),(36,'2025-04-25','414738','$2a$10$TJ8Y5KgOLdD41UDuqKvzze7nQWhLw2oTaNeQbm5UetT6T400KdWQq','FREELANCER','oliviaGarcia95',36),(37,'2025-04-25','834073','$2a$10$oRozJ8MQqOUsE3jmII5sh.TvUjkBOf6PC.9ORer4xRon03M756UYC','FREELANCER','lucasWilson09',37),(38,'2025-04-25','201705','$2a$10$3JK0Iku9i9HEK0rauS8v3unsMDcHbLS2eSq1fwBfzfCpMjdk2tbLy','FREELANCER','avaMiller13',38),(39,'2025-04-25','730040','$2a$10$XdRYiFGcZzM2I.xWwPqP2O7fM/4vlWir2RDcUQaAcCJvjihDzcl6C','FREELANCER','masonEvans45',39),(40,'2025-04-25','188225','$2a$10$HNEyXKRdgAyOSvJy1/VPgOSYa9mXjwV8ljxnxe2Na3bbXK7Um5vm6','FREELANCER','isabellaTurner19',40),(41,'2025-04-25','941826','$2a$10$/0ezEcBrJlykvT6CncUMMuDSkxKinPh7Y/AJCQt8ZJrZ2me2fzy7W','FREELANCER','harryMorgan92',41),(42,'2025-04-25','171768','$2a$10$4g5WtLu0q1ZNa5yJsd6EtuB3ZmXSr1oRgCUwZO2HM3Y8Iu.NoSYuO','FREELANCER','lucyPatterson33',42),(43,'2025-04-25','227723','$2a$10$2Q5OTpcG8tHwA4vdWO79N.11KuiHL1pBxU/bCdShye3LG9kDdzj/G','FREELANCER','nathanReed14',43),(44,'2025-04-25','785851','$2a$10$0G7lOMgF6kjLbad.yvmigOnPR.arpOi9hIERtP8Hyc9Q/AZ5lxmhu','FREELANCER','miaBailey76',44),(45,'2025-04-25','485441','$2a$10$2VpEf1FfZBugrJgtwjjSIe2wA/TsFEOdEIRsJkodAeDpZprHFEr6m','FREELANCER','loganWright65',45),(46,'2025-04-25','654865','$2a$10$GpxQJ1D6tmN0gHPeii522umgS02eDaHb4g6VmRyiA/33gy9iFBNWy','FREELANCER','ameliaPerry21',46),(47,'2025-04-25','722855','$2a$10$HZN.TFhSi4wh3HEKSFxIFOmUGgdbxqzImkv5NG5ekD55A4zm6yDbq','FREELANCER','jamesKelly90',47),(48,'2025-04-25','417821','$2a$10$WgYaJN9XhBIgDiGZ8gAtR.ijb/fMmlNLNJQJimaqCskrTsOJppm6u','FREELANCER','charlotteEvans08',48),(49,'2025-04-25','410151','$2a$10$93k/twTbiwx6ywg6ckJn.OEtu8vbo4wwDIvyirEnWTg9GWf/nziG.','FREELANCER','henryKing56',49),(50,'2025-04-25','421240','$2a$10$axdJECxokt3HO9Xm9lCS0.45nl8OD/57L3QD0IL15v3apv5.02Yl6','FREELANCER','graceCampbell77',50),(51,'2025-04-25','410925','$2a$10$ceI9b6JSjwQ06pf7gD8mUOWojvUKIpLsHu7XHrEw96zNbgzl7lKGW','FREELANCER','jackThomas29',51),(52,'2025-04-25','818055','$2a$10$W.SY6qw5BBy9LdJMZ8kah./ARgEiGUjA9QtYK8VwNRw2ROihEbZyW','FREELANCER','sophiaAllen82',52),(53,'2025-04-25','180396','$2a$10$V0UP4CtNrzQuZEFZ/F1/ne9h54.Ll5qKWeGkwZZhq40sj6QQzreSK','FREELANCER','williamMoore63',53),(54,'2025-04-25','590138','$2a$10$YMV8oYNlgtf0jPWnUp4LAOd9HQOxlFqka8N8J0d6HZjMheagBTuUK','FREELANCER','ellaScott47',54),(55,'2025-04-25','451019','$2a$10$KMOuehMJ0Fen4XkkRQLadOL4msn6ruCVETUfY3e7Yp6Z1TB1Y62va','FREELANCER','danielBaker17',55),(56,'2025-04-25','388888','$2a$10$nMdxuoFi1qqV1GuvfxnbZeIBEoXUfLCuc6x2oWhTLE1PNH7jKnSHW','FREELANCER','lilyTurner66',56),(57,'2025-04-25','888855','$2a$10$KeHisXQlabp2HLzPGcChYOh3IdtcKCMH7nAV.zNxyKQ6RXwSDOYpm','FREELANCER','oliverHarris31',57),(58,'2025-04-25','921347','$2a$10$TUqrE1jn/omot4NZmryr9.KN4zfZrenuXMlxTZ55NvjC91cqpRjaq','FREELANCER','avaMitchell12',58),(59,'2025-04-25','478169','$2a$10$H686cDurxBYDYA1wbVp38.VRTy6kXZyAub4q/RGaVVWnlIM5EGHBW','FREELANCER','michaelWalker20',59),(60,'2025-04-25','432486','$2a$10$bI.xr89Qy4RjMyXRPPKEFu5X27Fsspgkgbk1aMZuIbOMCnNCuMemy','FREELANCER','emilyRobinson99',60),(61,'2025-09-22','274876','$2a$10$JwkQCIc2fz2Ma7fFCChXcex0zPJd.OiD4WBtwo1hLubVMOdT.sP1O','FREELANCER','user',61);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'demo1'
--

--
-- Dumping routines for database 'demo1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-22 17:12:56
