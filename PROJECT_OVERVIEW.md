# Poka Ticket - Project Overview

## 📋 Tổng quan dự án

**Poka Ticket** là nền tảng ticketing phi tập trung được xây dựng trên Polkadot Cloud, nhằm giải quyết các vấn đề của hệ thống ticketing truyền thống như giả mạo vé, scalping, và thiếu minh bạch.

## 🎯 Vấn đề cần giải quyết

### 1. Giả mạo vé
Vé giả gây thiệt hại hàng triệu USD mỗi năm cho cả organizer và người tham dự.

### 2. Scalping & Bot
Bot mua hàng loạt vé để bán lại với giá cao, gây bất công cho người hâm mộ thực sự.

### 3. Thiếu minh bạch
Hệ thống tập trung không minh bạch về số lượng vé, phân phối, và doanh thu.

### 4. Phí trung gian cao
Các nền tảng ticketing truyền thống thu phí 10-20% mỗi giao dịch.

## 💡 Giải pháp

### NFT-based Ticketing
Mỗi vé là một NFT độc nhất trên Polkadot, không thể giả mạo và dễ dàng verify.

### Smart Contract Automation
Tự động hóa phát hành, chuyển nhượng, và verify vé thông qua smart contracts.

### Transparent & Fair
Toàn bộ giao dịch được ghi lại on-chain, đảm bảo minh bạch tuyệt đối.

### Low Fees
Phí giao dịch thấp nhờ Polkadot's efficient architecture.

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend dApp                        │
│              (React + Polkadot.js)                      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Polkadot Cloud                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Ticket     │  │     NFT      │  │  Marketplace │ │
│  │   Pallet     │  │   Pallet     │  │    Pallet    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Off-chain Services (Optional)              │
│     - IPFS (metadata storage)                           │
│     - Backend API (caching, analytics)                  │
└─────────────────────────────────────────────────────────┘
```

## 📂 Cấu trúc thư mục chi tiết

```
010-poka-ticket/
├── README.md                    # Project overview
├── SUBMISSION.md                # Hackathon submission
├── PROJECT_OVERVIEW.md          # This file
├── QUICK_START.md               # Quick start guide
├── LICENSE                      # MIT License
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── change_log.md                # Change log
│
├── 1_urs/                       # Phase 1: Requirements & Research
│   ├── urs_0_detail.md         # Hackathon details
│   ├── urs_1_research.md       # Polkadot research
│   ├── urs_2_domain.md         # Ticketing domain research
│   └── urs_3_competitors.md    # Competitive analysis
│
├── 2_design/                    # Phase 2: Design & Architecture
│   ├── des_1_idea.md           # Final idea
│   ├── des_2_architecture.md   # System architecture
│   ├── des_3_tech_stack.md     # Technology choices
│   └── des_4_deployment.md     # Deployment strategy
│
├── 3_dev/                       # Phase 3: Development
│   ├── contracts/              # Smart contracts (ink!/Solidity)
│   ├── src/                    # Source code
│   │   ├── frontend/           # React dApp
│   │   ├── backend/            # Optional API
│   │   └── pallets/            # Custom Substrate pallets
│   ├── scripts/                # Deployment & utility scripts
│   ├── tests/                  # Test suite
│   └── workflows/              # CI/CD workflows
│
├── 4_delivery/                  # Phase 4: Delivery & Submission
│   ├── docs/                   # Final documentation
│   │   ├── API.md              # API documentation
│   │   ├── ARCHITECTURE.md     # Architecture details
│   │   └── USER_GUIDE.md       # User guide
│   ├── deployments/            # Deployment records
│   │   ├── testnet.md          # Testnet deployment
│   │   └── mainnet.md          # Mainnet deployment (if any)
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── SUBMISSION_CHECKLIST.md # Pre-submission checklist
│
└── 5_analysis/                  # Phase 5: Post-Hackathon
    └── post_mortem.md          # Lessons learned
```

## 🔧 Tech Stack Chi tiết

### Blockchain Layer
- **Framework:** Polkadot SDK (Substrate 3.0+)
- **Smart Contracts:** ink! 4.0 (Rust-based)
- **Pallets:** Custom pallets for ticketing logic
- **Network:** Polkadot Testnet (Rococo/Westend)

### Frontend
- **Framework:** React 18 + TypeScript
- **Web3 Integration:** Polkadot.js API
- **UI Library:** TailwindCSS + shadcn/ui
- **State Management:** Zustand / Redux Toolkit
- **Wallet:** Polkadot.js Extension

### Backend (Optional)
- **API:** FastAPI (Python) hoặc Express (Node.js)
- **Database:** PostgreSQL (metadata caching)
- **Storage:** IPFS (ticket images, event details)
- **Caching:** Redis

### DevOps
- **CI/CD:** GitHub Actions
- **Testing:** Jest, Playwright, ink! tests
- **Deployment:** Docker, Kubernetes (optional)

## 🚀 Roadmap

### Phase 1: Research & Planning (Week 1)
- [x] Nghiên cứu Polkadot SDK & ink!
- [x] Phân tích domain ticketing
- [x] Thiết kế kiến trúc hệ thống
- [x] Chọn tech stack

### Phase 2: Core Development (Week 2-3)
- [ ] Phát triển smart contracts (Ticket, NFT pallets)
- [ ] Xây dựng frontend dApp
- [ ] Tích hợp Polkadot.js API
- [ ] Viết test suite

### Phase 3: Integration & Testing (Week 4)
- [ ] Deploy lên testnet
- [ ] End-to-end testing
- [ ] Bug fixes & optimization
- [ ] UI/UX polish

### Phase 4: Deployment & Submission (Week 5)
- [ ] Deploy production
- [ ] Tạo demo video
- [ ] Hoàn thiện documentation
- [ ] Submit to Devpost

## 📊 Success Metrics

### Technical Metrics
- ✅ >80% test coverage
- ✅ <2s transaction confirmation time
- ✅ Support 1000+ concurrent users
- ✅ Zero critical security vulnerabilities

### User Metrics
- ✅ <5 clicks to purchase ticket
- ✅ <30s onboarding time for new users
- ✅ Mobile-responsive design
- ✅ Support multiple languages

### Business Metrics
- ✅ <5% transaction fees (vs 10-20% traditional)
- ✅ 100% transparency on ticket distribution
- ✅ Prevent ticket fraud & scalping
- ✅ Enable fair secondary market

## 🎯 Hackathon Goals

### Minimum Viable Product (MVP)
- ✅ Basic ticket creation & minting
- ✅ Simple purchase flow
- ✅ QR code verification
- ✅ Deployed on testnet

### Target Features
- ✅ Full event management
- ✅ Secondary market with royalties
- ✅ Mobile-responsive UI
- ✅ Multi-language support

### Stretch Goals
- ✅ Cross-chain ticket transfers
- ✅ DAO governance for platform
- ✅ Advanced analytics dashboard
- ✅ Integration with other parachains

## 📚 Resources

### Polkadot Documentation
- **Polkadot SDK:** https://docs.substrate.io/
- **ink! Docs:** https://use.ink/
- **Polkadot.js:** https://polkadot.js.org/docs/

### Hackathon Resources
- **Devpost:** https://polkadot.devpost.com/
- **Discord:** https://discord.com/channels/722223075629727774/1420757115789905981
- **Resources Tab:** https://polkadot.devpost.com/resources

---

**Last Updated:** November 15, 2025  
**Status:** In Development
