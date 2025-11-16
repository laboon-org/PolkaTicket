# change_log

Theo dõi tất cả thay đổi quan trọng của dự án Poka Ticket.

---

## [0.1.0] - 2025-11-15

### added
- khởi tạo cấu trúc dự án theo chuẩn PROJECT_STRUCTURE_STD
- tạo thư mục 5 phase: 1_urs, 2_design, 3_dev, 4_delivery, 5_analysis
- tạo sub-folders trong 3_dev: contracts, src, scripts, tests, workflows
- tạo các file tài liệu cốt lõi:
  - README.md - tổng quan dự án
  - SUBMISSION.md - template nộp bài hackathon
  - PROJECT_OVERVIEW.md - kiến trúc và roadmap chi tiết
  - QUICK_START.md - hướng dẫn setup nhanh
  - LICENSE - MIT license
  - .gitignore - git ignore rules
  - .env.example - environment template
  - change_log.md - file này

### structure
```
010-poka-ticket/
├── README.md
├── SUBMISSION.md
├── PROJECT_OVERVIEW.md
├── QUICK_START.md
├── LICENSE
├── .env.example
├── .gitignore
├── change_log.md
├── 1_urs/
├── 2_design/
├── 3_dev/
│   ├── contracts/
│   ├── src/
│   ├── scripts/
│   ├── tests/
│   └── workflows/
├── 4_delivery/
│   ├── docs/
│   └── deployments/
└── 5_analysis/
```

### next steps
- [ ] import source code từ dự án cũ vào 3_dev/
- [ ] viết research documents trong 1_urs/
- [ ] thiết kế architecture trong 2_design/
- [ ] setup development environment
- [ ] bắt đầu development

---

## format

dựa trên [keep a changelog](https://keepachangelog.com/en/1.0.0/)

### types of changes
- `added` - tính năng mới
- `changed` - thay đổi trong functionality hiện có
- `deprecated` - tính năng sắp bị loại bỏ
- `removed` - tính năng đã bị loại bỏ
- `fixed` - bug fixes
- `security` - security fixes

---

**last updated:** 2025-11-15  
**version:** 0.1.0
