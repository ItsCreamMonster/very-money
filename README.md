# fun game (very money)
A little project for school about slot machine gambling.

The game starts with the player having $250 in virtual money and lets them choose between betting half, a quarter or a tenth of their current balance. When the player bets, the display spins for a while before slowing down and picking the output value. According to the following patterns is how the gain/loss amount is calculated:

<b>Jackpot</b> - 777\
Win amount = bet * 100

<b>AAA</b> - eg. 111 or 444\
Win amount = bet * 25

<b>AAB</b> - eg. 335 or 299\
Win amount = bet * 3

<b>Loss</b> - none of the above.\
Bet subtracted from balance.

The game continues as long as the player has more than $10. In that case, the game ends and just like the checkout button that can be pressed whenever, the player gets their (virtual) money and restarts. When checking out/the game ends, the popup shows the final amount and below the total gain and loss. You can also export the data from the current session as a CSV, useful for seeing how gambling often times is not profitable. The CSV contains the balance, gain/loss, amount and roll.

Every roll is also logged in the console and color coded.