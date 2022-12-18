
describe("Helpers test (with setup and tear-down)", function() {
    beforeEach(function () {
        billAmtInput.value = 200;
        tipAmtInput.value = 20;
        submitPaymentInfo();
      
    });  
  
    it('should sum total tip amount of all payments on sumPaymentTotal()', function () {
        expect(sumPaymentTotal('tipAmt')).toEqual(20);
        
        billAmtInput.value = 600;
        tipAmtInput.value = 30;

        submitPaymentInfo();

        expect(sumPaymentTotal('tipAmt')).toEqual(50);
    });
  
    it('should sum total bill amount of all payments on sumPaymentTotal()', function () {
        expect(sumPaymentTotal('billAmt')).toEqual(200);

        billAmtInput.value = 600;
        tipAmtInput.value = 30;

        submitPaymentInfo();

        expect(sumPaymentTotal('billAmt')).toEqual(800);        

    });
  
    it('should calculate total tip percent on sumPaymentTotal()', function () {
        expect(sumPaymentTotal('tipPercent')).toEqual(10);

        billAmtInput.value = 600;
        tipAmtInput.value = 30;

        submitPaymentInfo();

        expect(sumPaymentTotal('tipPercent')).toEqual(15);
  
    });

    it('should sum tip percent of a single tip on calculateTipPercent()', function () {
        expect(calculateTipPercent(200, 20)).toEqual(10);
        expect(calculateTipPercent(300, 100)).toEqual(33);
  
    });

    it('should generate new td from value and append to tr on appendTd(tr, value)', function () {
        let newTr = document.createElement('tr');

        appendTd(newTr, 'test');
        
        expect(newTr.innerText).toEqual('test');
        expect(newTr.children.length).toEqual(1);
  
    });  
  
    it('should generate delete td and append to tr on appendDeleteBtn(tr, type)', function () {
        let newTr = document.createElement('tr');

        appendDeleteBtn(newTr);
        
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstElementChild.innerText).toEqual('X'); 
  
    });

    afterEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        allPayments = {};
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        paymentId = 0;
    });
  });