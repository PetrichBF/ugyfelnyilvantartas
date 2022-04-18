-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2022. Ápr 18. 19:13
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
-- A tábla indexei `ugyfelek`
--
ALTER TABLE `ugyfelek`
  ADD PRIMARY KEY (`ugyfelid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `ugyfelek`
--
ALTER TABLE `ugyfelek`
  MODIFY `ugyfelid` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
