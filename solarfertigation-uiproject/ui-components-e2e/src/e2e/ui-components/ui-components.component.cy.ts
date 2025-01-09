describe('ui-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=uicomponentscomponent--primary'));
  it('should render the component', () => {
    cy.get('lib-ui-components').should('exist');
  });
});
