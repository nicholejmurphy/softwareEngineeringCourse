
describe("Payments test (with setup and tear-down)", function() {
    
    beforeEach(function () {
      billAmtInput.value = 600;
      tipAmtInput.value = 120;
      
    });  
  
    it('should add new payment to allPayments with submitPaymentInfo()', function () {

        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(Number(allPayments['payment1'].billAmt)).toEqual(600);
        expect(Number(allPayments['payment1'].tipAmt)).toEqual(120);
        expect(Number(allPayments['payment1'].tipPercent)).toEqual(20);

    });
  
    it('should not add new payment to allPayments with empty input', function () {
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);

        billAmtInput.value = '';
        tipAmtInput.value = 10;

        submitPaymentInfo();

        billAmtInput.value = 10;
        tipAmtInput.value = '';

        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);

    });
  
    it('should update #paymentTable on appendPaymenttable()', function () {
        submitPaymentInfo();

        let paymentTds = document.querySelectorAll('#paymentTable tbody tr td');

        expect(Object.keys(paymentTds).length).toEqual(4);
        expect(paymentTds[0].innerText).toEqual('$600');
        expect(paymentTds[1].innerText).toEqual('$120');
        expect(paymentTds[2].innerText).toEqual('20%');
        expect(paymentTds[3].innerText).toEqual('X');

    });

    it('should create a new payment on createCurPayment()', function () {
        let curPayment = createCurPayment();
        let newPayment = {
            billAmt: '600',
            tipAmt: '120',
            tipPercent: 20,
            };
        
        expect(curPayment).toEqual(newPayment);
        
    }); 

    it('should not create a new payment on createCurPayment() with an empty input', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';

        submitPaymentInfo();
  
        expect(createCurPayment()).toEqual(undefined);
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

