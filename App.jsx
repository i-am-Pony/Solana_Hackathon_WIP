import Phaser from "phaser";
import Boot from "./scenes/Boot.js";
import Preloader /*, { authEvents, AUTH }*/ from "./scenes/MainMenu.js";
import MainMenu /*, { STARTGAME }*/ from "./scenes/MainMenu.js";
import MainGame from "./scenes/Game.js";
import { useState, useEffect } from "react";
import Store, { playerLogged, UPDATE_SCORE } from "./Store";
import { Moralis } from 'moralis';
import { useMoralis, useWeb3ExecuteFunction' } from "react-moralis";
import tokenABBI from "./contracts/abis/GameToken.json";
import P2EABI from "./contracts/abis/P2EGame.json";

let game = null;
