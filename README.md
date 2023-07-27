# Next/React Crypto ATM
This project is Next/React compoent for a Crypto ATM application. This project has multiple functionalities to manage account balance by modifying it in multiple ways. 

## Features

This project has following features:

- connecting MetaMask wallet
- View account balance
- Deposit 1 ETH 
- Withdraw 1 ETH
- Multiply Balance with a multiple
- Divide Balance with a divisor
- Show account address

## Description
This project has two parts
1. Solidity program to deal with contact involving balance change which has following functiins
   1. `withdraw` function - used mainly to withdraw the balance
   2. `deposit` function - used mainly to withdraw the balance
   3. `multiplyBalance` function - used mainly to multiply the current balance. Algorithm here is to restrict some inputs and then find the final amount that should be increased to see it as a multiplied value. After getting that amount, just reused the code to deposit that amount.
   4. `divideBalance` function - used mainly to divide the current balance. Similar to  `multiplyBalance` but just used `withdraw` function to withdraw the equivalent amount.
2. Next/React powered UI component with uses deployed code of solidity.
   1. Here I have just hooked each functionality with respective functions in solidity program.
   2. On clicking Deposit 1 Eth, user can deposit 1 ETH. And similar for Withdraw 1 Eth.
   3. Given two inputs for utilising `multiplyBalance` and `divideBalance` so that user does not need to perform huge amount of transactions to increase/decrease the amount. Respective inputs takes multiple value or divisor value and performs the operation on button click.

## Getting Started
### Pre-requisites
- Have MetaMask Extension
- Setup MetaMask with local system
- Node should be installed


### Setup

1. Clone this repository to your local system
2. Go to project root directory
3. Install dependencies using `npm i`
4. Now after installing, run `npx hardhat node` in current/other terminal
5. Open another terminal, deploy the project by `npx hardhat run --network localhost scripts/deploy.js`
6. Copy address printed to pages/index.js file
7. Run development server by `npm run dev`
8. To view UI, open http://localhost:3000/
   
## Authors
Khushi Kumari

## License
This project is licensed under the MIT License - see the LICENSE.md file for details