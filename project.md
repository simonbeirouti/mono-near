# NEAR Blockchain MVP Proposal - 6 Day Timeline

## Core MVP Features

### 1. NFT Collection (Days 1-3)
- Simple NFT contract with basic minting functionality
- Fixed mint price
- Basic randomization for NFT distribution
- Minimal metadata structure
- No fancy animations or complex attributes
- Basic voting rights (1 NFT = 1 vote)

#### Minimal NFT Requirements:
```rust
pub struct Token {
    pub token_id: TokenId,
    pub owner_id: AccountId,
    pub metadata: TokenMetadata,
    pub voting_power: u8,  // Simple 1:1 voting power
}

pub struct TokenMetadata {
    pub title: Option<String>,
    pub description: Option<String>,
    pub media: Option<String>,  // IPFS hash
}
```

### 2. Sub-accounts (Day 4)
- Three basic sub-accounts:
  - treasury.example.near
  - community.example.near
  - team.example.near
- Simple access control
- No complex multi-sig implementation for MVP

### 3. Token Implementation (Days 5-6)
- Basic FT contract implementing NEP-141
- Fixed supply
- Simple distribution mechanism
- Basic pool setup with NEAR pairing

## Day-by-Day Timeline

### Day 1:
- Set up development environment
- Initialize project with near-sdk-rs
- Begin NFT contract development
- Create basic metadata structure

### Day 2:
- Complete NFT contract core functions
- Implement minting logic
- Add simple randomization
- Begin testing

### Day 3:
- Complete NFT testing
- Deploy to testnet
- Create simple minting frontend
- Upload test assets to IPFS (max 10 for MVP)

### Day 4:
- Create sub-accounts
- Set up basic access control
- Test sub-account interactions
- Deploy sub-account contracts

### Day 5:
- Implement token contract
- Set up distribution logic
- Begin pool setup
- Initial testing

### Day 6:
- Complete pool setup
- Final testing
- Deploy to mainnet
- Documentation

## MVP Smart Contract Structure

### NFT Contract:
```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub tokens: UnorderedMap<TokenId, Token>,
    pub owner_id: AccountId,
    pub metadata: NFTContractMetadata,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        // Basic initialization
    }

    pub fn nft_mint(&mut self, token_metadata: TokenMetadata) {
        // Simple minting logic
        // Basic randomization for token assignment
    }

    pub fn get_voting_power(&self, account_id: AccountId) -> u8 {
        // Simple 1:1 voting power calculation
    }
}
```

### Token Contract:
```rust
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Token {
    pub total_supply: Balance,
    pub accounts: UnorderedMap<AccountId, Balance>,
}

#[near_bindgen]
impl Token {
    #[init]
    pub fn new(total_supply: Balance) -> Self {
        // Basic initialization with fixed supply
    }

    pub fn ft_transfer(&mut self, receiver_id: AccountId, amount: U128) {
        // Basic transfer implementation
    }
}
```

## Minimum Required Resources

### Development:
- 1 Rust developer (full-time)
- 1 Frontend developer (part-time)

### Infrastructure:
- IPFS for NFT storage (Pinata or similar)
- NEAR testnet account
- NEAR mainnet account with sufficient funds

### Testing:
- Unit tests for core functionality
- Testnet deployment testing
- Basic integration tests

## Critical MVP Features vs Future Improvements

### MVP Features:
✅ Basic NFT minting with fixed price
✅ Simple randomization
✅ Basic voting rights
✅ Sub-account creation
✅ Token creation and distribution
✅ Simple liquidity pool

### Post-MVP Improvements:
❌ Advanced randomization
❌ Multi-sig implementation
❌ Complex voting mechanisms
❌ Vesting schedules
❌ Advanced pool features
❌ Governance mechanisms

## Immediate Action Items

1. Set up development environment
   - Install Rust and required tools
   - Configure NEAR CLI
   - Set up project repository

2. Prepare assets
   - Create 10 test NFT images
   - Upload to IPFS
   - Document IPFS hashes

3. Initialize contracts
   - NFT contract scaffold
   - Token contract scaffold
   - Basic test structure

## Risk Mitigation

### Technical Risks:
- Keep contracts simple
- Focus on core functionality
- Use well-tested NEP standards
- Maintain frequent testnet deployments

### Time Risks:
- Skip complex features
- Use existing contract templates
- Focus on critical path items
- Daily progress tracking

## Testing Requirements

### Smart Contracts:
- Basic unit tests
- Simple integration tests
- Testnet deployment

### Frontend:
- Basic minting functionality
- Wallet connection
- Token transfers
- Account balance display

This MVP focuses on delivering core functionality within the 6-day timeframe while maintaining security and reliability. Complex features are deliberately excluded to ensure timely delivery.