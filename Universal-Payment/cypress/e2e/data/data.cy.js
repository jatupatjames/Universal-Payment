// Input Value
const data = {
    origin: 'https://upayment.tbs.prior-dev.app',
    path: '/cypress/fixtures/Universal_Payment_JAMFHA.html'
  };

const colorCode = {
  inactive: 'rgba(0, 0, 0, 0)',
  hover: 'rgba(255, 212, 0, 0.2)',
  active: 'rgb(255, 251, 230)'
};

function getRandomAlphanumeric(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const coupon = {
  code: getRandomAlphanumeric(5),// e.g., "aK7d29BqLm"
  name: 'Test',
  desc: 'Automate Testing',
  startDate: '27',
  endDate: '30',
  type: 'สาธารณะ',
  typeValue: 'คูปองเงินสด',
  minimumPayment: '1,000.15',
  discount: '50.20',
  limitNumberOfCoupon: 'Unlimited',
  condition: 'รวมส่วนลดแล้ว'
}

module.exports = { data,colorCode,coupon };