import * as allFunctions from './function/function.cy.js';
Object.assign(global, allFunctions);

describe.skip('Check Menu Displaying', () => {
  it('Open browser', () => {
    login();
    selectUser('MAKER: JAMFHA1');
    defaultBGcolor();
    clickMenu('Company Transaction Mock');
    clickSubmenu('Payment Link',"Draft")
  });
});

describe('Create Coupon', () => {
  it('Maker keyin coupon -> Public , Cash Coupon', () => {
    login();
    selectUser('MAKER: JAMFHA1');
    clickSubmenu('Shop Setting','Coupon')
    clickButton('New Coupon')
    typeCouponCode()
    typeCouponName()
    typeCouponDescription()
    couponPeriod()
    selectCouponType()
    selectCouponTypeValue()
    couponCashDetail()
    selectCondition()
    clickButton('Next')
    verifyDetailOnPreviewScreen()
    clickButton('Create Coupon')
    clickButton('Confirm')
    clickMenu('Company Transaction Mock');
    clickSubmenu('Shop Setting','Waiting Approve')
  });
});

