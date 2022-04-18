-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2022. Ápr 18. 19:20
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `konditeremteszt`
--
CREATE DATABASE IF NOT EXISTS `konditeremteszt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `konditeremteszt`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `belepesek`
--

CREATE TABLE `belepesek` (
  `belepesid` int(6) NOT NULL,
  `berletid` int(6) NOT NULL,
  `belepes` datetime NOT NULL DEFAULT current_timestamp(),
  `kilepes` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `belepesek`
--

INSERT INTO `belepesek` (`belepesid`, `berletid`, `belepes`, `kilepes`) VALUES
(1, 5, '2022-02-08 20:02:26', '2022-02-12 16:33:49'),
(2, 5, '2022-02-08 20:10:20', '2022-02-12 18:22:41'),
(3, 5, '2022-02-08 20:13:28', '2022-02-12 16:37:04'),
(4, 5, '2022-02-08 20:16:13', '2022-02-13 15:51:06'),
(5, 6, '2022-02-09 19:55:52', '2022-02-13 15:51:09'),
(6, 3, '2022-02-12 19:13:12', '2022-02-19 15:58:17'),
(7, 8, '2022-02-12 19:14:03', '2022-02-19 18:06:28'),
(8, 13, '2022-02-19 16:12:56', '2022-02-19 16:17:20'),
(9, 8, '2022-02-19 16:17:04', '2022-03-15 08:39:30'),
(10, 14, '2022-02-27 20:26:20', NULL),
(11, 16, '2022-03-15 08:40:35', '2022-04-16 18:59:31'),
(12, 8, '2022-04-11 17:35:53', '2022-04-16 18:59:32'),
(13, 20, '2022-04-11 20:07:15', '2022-04-11 20:09:19'),
(14, 24, '2022-04-16 18:55:04', '2022-04-16 18:59:34'),
(15, 8, '2022-04-16 18:59:50', NULL),
(16, 13, '2022-04-16 18:59:53', NULL),
(17, 18, '2022-04-16 19:00:03', NULL),
(18, 21, '2022-04-16 19:00:10', NULL),
(19, 8, '2022-04-16 19:04:50', NULL),
(20, 13, '2022-04-16 19:04:53', NULL),
(21, 18, '2022-04-16 19:04:56', NULL),
(22, 13, '2022-04-16 19:04:58', NULL),
(23, 8, '2022-04-16 19:05:00', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berletek`
--

CREATE TABLE `berletek` (
  `berletid` int(6) NOT NULL,
  `ugyfelid` int(4) NOT NULL,
  `berletnev` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `eladnap` datetime NOT NULL,
  `ervkezdet` date NOT NULL,
  `ervnapok` int(3) NOT NULL,
  `ar` int(6) NOT NULL,
  `lehetosegek` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `berletek`
--

INSERT INTO `berletek` (`berletid`, `ugyfelid`, `berletnev`, `eladnap`, `ervkezdet`, `ervnapok`, `ar`, `lehetosegek`) VALUES
(1, 1, 'Napi', '2022-02-06 00:00:00', '2022-02-06', 1, 1000, 0),
(2, 2, 'Napi', '2022-02-06 00:00:00', '2022-02-25', 1, 1000, 1),
(3, 2, 'Heti', '2022-02-06 00:00:00', '2022-02-12', 7, 4990, 1),
(4, 2, 'Havi', '2022-02-06 00:00:00', '2022-03-01', 30, 10500, 999),
(5, 2, 'Aerobic', '2022-02-07 00:00:00', '2022-02-08', 1, 1300, 1),
(6, 2, 'Napi', '2022-02-09 00:00:00', '2022-02-09', 1, 1000, 1),
(7, 1, 'Aerobic', '2022-02-09 00:00:00', '2022-02-09', 1, 1300, 1),
(8, 3, 'Éves diák', '2022-02-12 17:04:19', '2022-02-12', 365, 54500, 999),
(9, 3, 'Aerobic', '2022-02-12 17:06:41', '2022-02-11', 1, 1300, 1),
(10, 3, '10alkalmas', '2022-02-12 17:08:45', '2022-02-10', 30, 8000, 6),
(11, 3, '10alkalmas', '2022-02-13 15:10:00', '2022-02-13', 30, 8000, 7),
(12, 1, 'Aerobic', '2022-02-13 15:52:57', '2022-02-13', 1, 1300, -1),
(13, 3, 'Éves diák', '2022-02-19 16:01:57', '2022-02-19', 365, 54500, 999),
(14, 5, '10alkalmas', '2022-02-27 20:25:38', '2022-02-27', 30, 8000, 9),
(15, 5, 'Aerobic', '2022-02-27 20:38:01', '2022-02-28', 1, 1300, 1),
(16, 22, 'Heti', '2022-03-15 08:38:52', '2022-03-15', 7, 4990, 6),
(17, 25, 'Aerobic', '2022-03-15 08:39:06', '2022-03-15', 1, 1300, 1),
(18, 3, 'Havi nh', '2022-04-11 17:36:29', '2022-04-14', 30, 10500, 999),
(19, 3, 'Aerobic', '2022-04-11 19:50:30', '2022-04-11', 1, 1300, 1),
(20, 24, 'Napi', '2022-04-11 20:03:54', '2022-04-11', 1, 1000, 0),
(21, 8, '10 alkalmas', '2022-04-11 20:10:14', '2022-04-11', 30, 8000, 9),
(22, 8, 'Napi', '2022-04-11 20:15:17', '2022-04-11', 1, 1000, 1),
(23, 8, 'Aerobic', '2022-04-11 20:17:01', '2022-04-11', 1, 1300, 1),
(24, 12, 'Aerobic', '2022-04-16 18:54:44', '2022-04-16', 1, 1300, 0),
(25, 1, '10 alkalmas', '2022-04-16 19:06:01', '2022-04-16', 30, 8000, 10),
(26, 2, '10 alkalmas', '2022-04-16 19:06:09', '2022-04-16', 30, 8000, 10),
(27, 9, '10 alkalmas', '2022-04-16 19:06:19', '2022-04-16', 30, 8000, 10),
(28, 10, '10 alkalmas', '2022-04-16 19:06:37', '2022-04-16', 30, 8000, 10),
(29, 11, 'Éves', '2022-04-16 19:07:01', '2022-04-16', 365, 105000, 999);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berlettipusok`
--

CREATE TABLE `berlettipusok` (
  `berlettipusid` int(4) NOT NULL,
  `berletnev` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ervenynap` int(3) NOT NULL,
  `ervenyalkalom` int(3) NOT NULL,
  `ar` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `berlettipusok`
--

INSERT INTO `berlettipusok` (`berlettipusid`, `berletnev`, `ervenynap`, `ervenyalkalom`, `ar`) VALUES
(1, 'Napi', 1, 1, 1000),
(2, '10 alkalmas', 30, 10, 8000),
(3, 'Heti', 7, 7, 4990),
(4, 'Havi nh', 30, 999, 10500),
(5, 'Aerobic', 1, 1, 1300),
(6, 'Éves', 365, 999, 105000),
(7, 'Éves diák', 366, 999, 54500);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ugyfelek`
--

CREATE TABLE `ugyfelek` (
  `ugyfelid` int(4) NOT NULL,
  `csaladnev` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `keresztnev` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szulido` date NOT NULL,
  `neme` enum('N','F') COLLATE utf8mb4_hungarian_ci NOT NULL,
  `telefon` varchar(12) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `iranyitoszam` varchar(4) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `telepules` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `lakcim` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `hirlevel` tinyint(1) NOT NULL,
  `jelszo` varchar(64) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `ugyfelek`
--

INSERT INTO `ugyfelek` (`ugyfelid`, `csaladnev`, `keresztnev`, `szulido`, `neme`, `telefon`, `email`, `iranyitoszam`, `telepules`, `lakcim`, `hirlevel`, `jelszo`) VALUES
(1, 'Teszt', 'Elek', '2022-01-30', 'F', '8888', 'nincs@cim.hu', '1111', 'Alap', 'Szép utca 1', 0, '12345'),
(2, 'Teszt', 'Ilona', '2022-01-20', 'N', '767676', 'teszt@valami.hu', '2222', 'Almásfüzitő', 'Lengyel lakótelep', 1, '43212'),
(3, 'Próba', 'Ancsa', '2021-12-27', 'N', '654', 'proba@ancsa.hu', '8888', 'Ajka', 'Kelep utca 17.', 0, '$2b$10$KCenzIfQZKN2EQGfqdpe7eEKW/kUQwVAZGjmuVk4iETHQLWw607rS'),
(8, 'Kozma', 'Mihály', '2013-03-12', 'F', '5698', 'almata@gmail.com', '1183', 'Budapest', 'Törő', 1, 'Komi'),
(9, 'Dallos', 'Béla', '1990-04-27', 'F', '25678', 'dallos@freemail.hu', '1189', 'Budapest', 'Tűzoltó u. 15.', 1, 'dabé'),
(10, 'Cserép', 'Virág', '1968-09-13', 'N', '12225', 'virag@freemail.hu', '2220', 'Vecsés', 'Lázár u. 4.', 0, 'csevi'),
(11, 'Major', 'Anna', '1985-02-17', 'N', '9985', 'maja@gmail.com', '2030', 'Budaörs', 'fűzfa utca 6.', 0, 'maja'),
(12, 'Csikar', 'Tamás', '1962-02-24', 'F', '665244', 'csikar@freemail.hu', '2200', 'Monor', 'Tálas u. 7.', 0, 'csita'),
(13, 'Szenci', 'Géza', '1964-02-10', 'F', '446699', 'szenci15@freemail.hu', '1811', 'Budapest', 'Kis János u. 2.', 1, 'szege'),
(14, 'Forra', 'Dalma', '1992-02-16', 'N', '221133', 'forradalmi@freemail.hu', '2040', 'Gödöllő', 'Váza u. 95.', 1, 'foda'),
(15, 'Nebáncs', 'Virág', '1998-02-16', 'N', '554471', 'szirom@gmail.com', '1516', 'Albertirsa', 'Mező tér 2.', 1, 'nevi'),
(16, 'Kakukk', 'Márton', '2000-02-13', 'F', '998745', 'marci@freeamail.com', '2015', 'Szentendre', 'Feső u. 69.', 0, 'kama'),
(17, 'Kavics', 'Bánya', '2003-12-27', 'F', '33998', 'banya@freemail.com', '2240', 'Törökbálint', 'Pasa u. 6.', 0, 'kaba'),
(19, 'Majoros', 'Dóra', '2005-02-07', 'N', '62351', 'dori@gmail.com', '2345', 'Budakalász', 'Gyöngy u. 1.', 0, 'mado'),
(20, 'Fonott', 'Kosár', '2005-02-09', 'N', '332211', 'kosi@freemail.com', '2654', 'Dóramajor', 'van út 8.', 0, 'foko'),
(21, 'Tichi', 'Lajos', '1962-02-24', 'F', '776655', 'lali@vnet.com', '1928', 'Piliscsaba', 'Meredek u. 54.', 1, 'tila'),
(22, 'Bazsó', 'Márton', '1994-02-17', 'F', '515359', 'bazsom@freemail.hu', '1564', 'Buda', 'Tétényi út 152.', 1, 'bama'),
(24, 'Makrancos', 'Kata', '1999-02-14', 'N', '225566', 'katam@vnet.com', '2526', 'Valahol', 'Bármely u. 1.', 1, 'maka'),
(25, 'Horváth-Nagy', 'Ibolya Júlia', '2000-03-15', 'N', '56/413-413', 'hnij@gmail.com', '1111', 'Szeged', 'Hársfa bokor 411', 1, 'HoIb2'),
(26, 'Minta', 'Elemér', '2021-12-27', 'N', '654321', 'proba@elemer.hu', '1234', 'Rajka', 'Gólya utca 17.', 0, '$2b$10$jyb8zT4WkUW8BDyhccNUpOZsFODd4BTwu9Vu40Ur5suKrTdvCMpsW');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `belepesek`
--
ALTER TABLE `belepesek`
  ADD PRIMARY KEY (`belepesid`),
  ADD KEY `berletid` (`berletid`);

--
-- A tábla indexei `berletek`
--
ALTER TABLE `berletek`
  ADD PRIMARY KEY (`berletid`),
  ADD KEY `ugyfelid` (`ugyfelid`),
  ADD KEY `berlettipusid` (`berletnev`);

--
-- A tábla indexei `berlettipusok`
--
ALTER TABLE `berlettipusok`
  ADD PRIMARY KEY (`berlettipusid`);

--
-- A tábla indexei `ugyfelek`
--
ALTER TABLE `ugyfelek`
  ADD PRIMARY KEY (`ugyfelid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `belepesek`
--
ALTER TABLE `belepesek`
  MODIFY `belepesid` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT a táblához `berletek`
--
ALTER TABLE `berletek`
  MODIFY `berletid` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT a táblához `berlettipusok`
--
ALTER TABLE `berlettipusok`
  MODIFY `berlettipusid` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `ugyfelek`
--
ALTER TABLE `ugyfelek`
  MODIFY `ugyfelid` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
