# 💰 Hướng Dẫn Lấy Testnet Tokens (SBY) - Shibuya Faucet

## 🎯 Cần bao nhiêu tokens?

- **Minimum:** 0.1 SBY (đủ cho vài transactions)
- **Recommended:** 1-5 SBY (đủ test thoải mái)
- **Faucet cho:** ~1 SBY mỗi lần request

---

## 🚀 Phương Pháp 1: Astar Portal Faucet (KHUYẾN NGHỊ)

### Bước 1: Mở Astar Portal

```
https://portal.astar.network/
```

### Bước 2: Kết nối ví

1. Click **"Connect"** ở góc trên phải
2. Chọn **"Polkadot.js Extension"**
3. Chọn account của bạn
4. Click **"Connect"**

### Bước 3: Chuyển sang Shibuya Testnet

1. Click dropdown network ở góc trên trái (hiện đang là "Astar")
2. Chọn **"Shibuya (Testnet)"**
3. Đợi page reload

### Bước 4: Lấy tokens từ Faucet

1. Vào tab **"Assets"** (hoặc truy cập trực tiếp: https://portal.astar.network/shibuya-testnet/assets)
2. Tìm nút **"Faucet"** (màu xanh, góc trên bên phải)
3. Click **"Faucet"**
4. Popup hiện lên → Click **"Confirm"**
5. Đợi 10-30 giây
6. ✅ Balance của bạn sẽ tăng lên ~1 SBY!

### Lưu ý:
- ⏰ Chỉ request được 1 lần / 24 giờ / địa chỉ
- 🔄 Nếu cần thêm, dùng phương pháp 2 hoặc 3

---

## 💬 Phương Pháp 2: Discord Faucet

### Bước 1: Join Astar Discord

```
https://discord.gg/astarnetwork
```

### Bước 2: Tìm kênh #shibuya-faucet

1. Vào server Astar Network
2. Tìm category **"TESTNET"**
3. Vào kênh **#shibuya-faucet**

### Bước 3: Request tokens

Gõ lệnh:
```
/drip <your_wallet_address>
```

Ví dụ:
```
/drip 5FCwde1dukCfPCpe7WSUx7oRjazwaA8VfAPmLkWhtoZYk261
```

### Bước 4: Đợi bot trả lời

- ✅ Bot sẽ reply và gửi tokens (~1 SBY)
- ⏰ Thời gian: 10-60 giây
- 🔄 Có thể request lại sau 24 giờ

---

## 🌐 Phương Pháp 3: Matrix Faucet

### Bước 1: Join Matrix Room

```
https://matrix.to/#/#shibuya-faucet:matrix.org
```

### Bước 2: Gửi message

```
!drip <your_wallet_address>
```

Ví dụ:
```
!drip 5FCwde1dukCfPCpe7WSUx7oRjazwaA8VfAPmLkWhtoZYk261
```

### Bước 3: Đợi bot

- Bot sẽ reply và gửi tokens
- Thời gian: 10-60 giây

---

## 🔍 Kiểm Tra Balance

### Cách 1: Astar Portal

1. Vào https://portal.astar.network/shibuya-testnet/assets
2. Connect wallet
3. Xem balance ở tab "Assets"

### Cách 2: Polkadot.js Apps

1. Vào https://polkadot.js.org/apps/?rpc=wss://shibuya-rpc.dwellir.com#/accounts
2. Tìm địa chỉ của bạn
3. Xem balance (đơn vị: SBY)

### Cách 3: Subscan Explorer

1. Vào https://shibuya.subscan.io/
2. Paste địa chỉ vào search box
3. Xem balance và transaction history

---

## ❌ Troubleshooting

### Lỗi: "Faucet button không hiện"

**Nguyên nhân:** Chưa connect wallet hoặc đang ở mainnet

**Giải pháp:**
1. Đảm bảo đã connect Polkadot.js Extension
2. Chuyển sang Shibuya Testnet (không phải Astar mainnet)
3. Refresh page

### Lỗi: "Request failed" hoặc "Rate limited"

**Nguyên nhân:** Đã request trong 24 giờ qua

**Giải pháp:**
1. Đợi 24 giờ
2. Thử phương pháp khác (Discord/Matrix)
3. Dùng địa chỉ wallet khác (nếu có)

### Lỗi: Discord bot không reply

**Nguyên nhân:** Bot bận hoặc faucet hết tokens

**Giải pháp:**
1. Đợi 5-10 phút và thử lại
2. Kiểm tra format lệnh đúng chưa: `/drip <address>`
3. Thử Matrix faucet thay thế

### Balance vẫn 0 sau khi request

**Nguyên nhân:** Transaction chưa confirm hoặc RPC lag

**Giải pháp:**
1. Đợi thêm 1-2 phút
2. Refresh Astar Portal
3. Check trên Subscan: https://shibuya.subscan.io/
4. Thử RPC khác trong Polkadot.js Apps

---

## 📊 Ước Tính Gas Fees

| Action | Gas Cost (SBY) | Số lần với 1 SBY |
|--------|----------------|------------------|
| Transfer tokens | ~0.001 | ~1000 lần |
| Mint NFT ticket | ~0.01 | ~100 lần |
| XCM cross-chain | ~0.05 | ~20 lần |
| Smart contract call | ~0.005 | ~200 lần |

**Kết luận:** 1 SBY đủ test rất nhiều! 🎉

---

## 🎯 Quick Reference

### Địa chỉ ví của bạn:
```
5FCwde1dukCfPCpe7WSUx7oRjazwaA8VfAPmLkWhtoZYk261
```

### Faucet Links:
- **Astar Portal:** https://portal.astar.network/shibuya-testnet/assets
- **Discord:** https://discord.gg/astarnetwork → #shibuya-faucet
- **Matrix:** https://matrix.to/#/#shibuya-faucet:matrix.org

### Check Balance:
- **Portal:** https://portal.astar.network/shibuya-testnet/assets
- **Subscan:** https://shibuya.subscan.io/account/5FCwde1dukCfPCpe7WSUx7oRjazwaA8VfAPmLkWhtoZYk261

---

## ✅ Checklist

- [ ] Đã cài Polkadot.js Extension
- [ ] Đã tạo wallet
- [ ] Đã copy địa chỉ wallet: `5FCwde1dukCfPCpe7WSUx7oRjazwaA8VfAPmLkWhtoZYk261`
- [ ] Đã vào Astar Portal
- [ ] Đã connect wallet
- [ ] Đã chuyển sang Shibuya Testnet
- [ ] Đã click Faucet button
- [ ] Đã nhận được ~1 SBY
- [ ] Đã verify balance > 0
- [ ] Sẵn sàng test Polka Ticket! 🚀

---

**Lưu ý:** Nếu vẫn gặp vấn đề, hãy hỏi trong Astar Discord #shibuya-faucet channel, community rất friendly! 😊
