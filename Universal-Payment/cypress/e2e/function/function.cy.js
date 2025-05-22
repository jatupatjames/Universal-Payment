const { data , colorCode, coupon} = require('../data/data.cy.js');
import 'cypress-real-events/support';


export function login() {
  cy.viewport(1920, 1080); // Set screen size
    cy.visit(data.path,{ failOnStatusCode: false });
    cy.clearCookies();
    cy.clearLocalStorage();
}

// Selects a user from the list
export function selectUser(user) {
    cy.contains(user).click();
}

export function defaultBGcolor() {
  const colorChecks = [
    { label: 'Dashboard', color: colorCode.active },
    { label: 'Payment Link', color: colorCode.inactive },
    { label: 'Company Transaction Mock', color: colorCode.inactive },
  ];

  cy.origin(data.origin, { args: { colorChecks } }, ({ colorChecks }) => {
    colorChecks.forEach(({ label, color }) => {
      cy.get('.wrap-sidenav-desktop.ng-star-inserted')
      .contains(label)
      .parent()
      .should('have.css', 'background-color', color);
    });
  });
}

export function clickMenu(menu) {
  cy.origin(data.origin, { args: { menu } }, ({ menu }) => {
    cy.get('.wrap-sidenav-desktop.ng-star-inserted')
    .should('be.visible')
    .contains(menu)
    .click()
})
}

export function clickSubmenu(menu,submenu) {
  cy.origin(data.origin, {args: {menu,submenu} },({menu,submenu}) => {
    cy.get('.wrap-sidenav-desktop.ng-star-inserted')
    .should('be.visible')
    .contains(menu)
    .trigger('mouseover')
  cy.contains(submenu).click()
  })
}

export function clickButton(button) {
  cy.origin(data.origin, {args: {button} } ,({button}) => {
    cy.get('button').contains(button).click()
  })
}

export function typeCouponCode() {
  cy.origin(data.origin, {args: { couponCode: coupon.code} } ,({couponCode}) => {
    cy.get('app-coupon-new>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(2)>:nth-child(1) input')
    .type(couponCode)
  })
}

export function typeCouponName() {
  cy.origin(data.origin, {args: { couponName: coupon.name} } ,({couponName}) => {
    cy.get('app-coupon-new>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(4) input').type(couponName)
  })
}

export function typeCouponDescription() {
  cy.origin(data.origin, {args: { couponDesc: coupon.desc} } ,({couponDesc}) => {
    cy.get('app-coupon-new>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(6) textarea')
    .type(couponDesc)
  })
}

export function couponPeriod() {
  cy.origin(data.origin, {args: {startDate: coupon.startDate , endDate: coupon.endDate} } ,({startDate,endDate}) => {
    cy.get('nz-range-picker input[placeholder="Start date"], nz-range-picker input[placeholder="วันที่เริ่มต้น"]').click()
    cy.get('.ant-picker-cell-in-view').contains(startDate).click();
    cy.get('nz-range-picker input[placeholder="End date"], nz-range-picker input[placeholder="วันที่สิ้นสุด"] ').click()
    cy.get('.ant-picker-cell-in-view').contains(endDate).click();
    cy.contains('ตกลง').click()
  })
}

export function selectCouponType() {
  cy.origin(data.origin, {args: {type :coupon.type} } ,({type}) => {
    cy.get('app-select[phd="Select Coupon Type"] input').click()
    cy.contains(type,{ timeout: 10000 }).click()
  })
}

export function selectCouponTypeValue() {
  cy.origin(data.origin, {args: {typeValue : coupon.typeValue} } ,({typeValue}) => {
    cy.get('app-select[phd="Select Coupon Type Value"] input').click()
    cy.contains(typeValue,{ timeout: 10000 }).click()
  })
}

export function couponCashDetail() {
  cy.origin(data.origin, {args: {minimumPayment: coupon.minimumPayment , discount: coupon.discount} } ,({minimumPayment,discount}) => {
    cy.contains('Minimum Payment:')
    .parent()
    .find('input')
    .first()
    .type(minimumPayment)
    cy.contains('Discount')
    .parent()
    .find('input')
    .eq(1)
    .type(discount)
  })
}

export function selectLimitNumberOfCoupon() {
  cy.origin(data.origin, {args: {limitNo: coupon.limitNumberOfCoupon} } ,({limitNo}) => {
    cy.contains(limitNo).parent().find('input').click()
  })
}

export function selectCondition() {
  cy.origin(data.origin, {args: {condition: coupon.condition} } ,({condition}) => {
    cy.get('app-select[phd="Select Condition"] input').click()
    cy.contains(condition,{ timeout: 10000 }).click()
  })
}

export function verifyDetailOnPreviewScreen() {
  cy.origin(data.origin, {args: {
    code: coupon.code, 
    name: coupon.name, 
    desc: coupon.desc, 
    startDate: coupon.startDate, 
    endDate: coupon.endDate,
    type: coupon.type, 
    typeValue: coupon.typeValue, 
    minimumPayment: coupon.minimumPayment, 
    discount: coupon.discount, 
    limitNo: coupon.limitNumberOfCoupon,
    condition: coupon.condition} } ,
    ({code, name, desc, startDate, endDate, type, typeValue, minimumPayment, discount, limitNo, condition}) => {
    cy.contains('Coupon Code:').parent().find('p').eq(1).should('contain',code);
    cy.contains('Coupon Name:').parent().find('p').eq(1).should('contain',name);
    cy.contains('Coupon Description:').parent().find('p').eq(1).should('contain',desc);
    cy.contains('Coupon Type:').parent().find('p').eq(1).should('contain',type);
    cy.contains('Coupon Type Value:').parent().find('p').eq(1).should('contain',typeValue);
    cy.contains('Minimum Payment:').parent().find('p').eq(1).should('contain',minimumPayment);
    cy.contains('Discount:').parent().find('p').eq(4).should('contain',discount);
    cy.contains(limitNo).parent().within(() => {
      cy.get('img[alt="checked"]').should('exist');
    });
    cy.contains('Condition:').parent().find('p').eq(1).should('contain',condition);
  })
}