
describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    serverNameInput.value = 'Alice';
  });  

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not add a server on submitServerInfo() w/ an empty string', function () {
    serverNameInput.value = '';
    submitServerInfo();
    
    expect(Object.keys(allServers).length).toEqual(0);

  });

  it('should update #servertable on updateServerTable()', function () {
    submitServerInfo();
    updateServerTable();

    let tableTdList = document.querySelectorAll('#serverTable tbody tr td');

    expect(tableTdList.length).toEqual(3);
    expect(tableTdList[0].innerText).toEqual('Alice');
    expect(tableTdList[1].innerText).toEqual('$0.00');
    expect(tableTdList[2].innerText).toEqual('X');

  });

  afterEach(function() {
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
  });
});
