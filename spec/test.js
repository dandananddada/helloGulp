describe("it wrong", function() {
  it("when 1+1=2", function() {
    return expect(1 + 1).toEqual(2);
  });
  return it("when 2+2=3", function() {
    return expect(2 + 2).toEqual(3);
  });
});
