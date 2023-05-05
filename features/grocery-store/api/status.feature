Feature: Simple Grocery Store API

  @NXT @GroceryStore @api @TCKey=<API-Status_01> @bug=<API-B01>
  Scenario: Verify Grocery Store Status is DOWN
    When I get grocery store status
    Then I see grocery store status is "UP"

  @NXT @GroceryStore @api @TCKey=<API-Card_01>
  Scenario: Create new card
    When I create a new card
    Then I can get the new created card

  @NXT @GroceryStore @api @TCKey=<API-Product_01>
  Scenario: Get the first product then assign to created card
    When I get the first products
    Then I add product to the created card with the quantity is 3

  @NXT @GroceryStore @api @TCKey=<API-Product_02>
  Scenario: Remove product from the card
    When I remove product from the card
    Then I dont see the product in card info
