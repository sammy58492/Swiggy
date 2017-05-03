<?php
require_once '_environment.php';
 
function braintree_text_field($label, $name, $result) {
    echo('<div>' . $label . '</div>');
    $fieldValue = isset($result) ? $result->valueForHtmlField($name) : '';
    echo('<div><input type="text" name="' . $name .'" value="' . $fieldValue . '" /></div>');
    $errors = isset($result) ? $result->errors->onHtmlField($name) : array();
    foreach($errors as $error) {
        echo('<div style="color: red;">' . $error->message . '</div>');
    }
    echo("\n");
}
?>
 
<html>
    <head>
        <title>Braintree Transparent Redirect</title>
    </head>
    <body>
        <?php
        if (isset($_GET["id"])) {
			
			$tr_data = Braintree_TransparentRedirect::transactionData(
                    array('redirectUrl' => "http://" . $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH),
                    'transaction' => array('amount' => '10.00', 'type' => 'sale')));
					

            $result = Braintree_TransparentRedirect::confirm($_SERVER['QUERY_STRING']);
			
			
			
        }
        if (isset($result) && $result->success) { ?>
            <h1>Braintree Transparent Redirect Response</h1>
            <?php $transaction = $result->transaction; ?>
            <table>
                <tr><td>transaction id</td><td><?php echo htmlentities($transaction->id); ?></td></tr>
                <tr><td>transaction status</td><td><?php echo htmlentities($transaction->status); ?></td></tr>
                <tr><td>transaction amount</td><td><?php echo htmlentities($transaction->amount); ?></td></tr>
                <tr><td>customer first name</td><td><?php echo htmlentities($transaction->customerDetails->firstName); ?></td></tr>
                <tr><td>customer last name</td><td><?php echo htmlentities($transaction->customerDetails->lastName); ?></td></tr>
                <tr><td>customer email</td><td><?php echo htmlentities($transaction->customerDetails->email); ?></td></tr>
                <tr><td>credit card number</td><td><?php echo htmlentities($transaction->creditCardDetails->maskedNumber); ?></td></tr>
                <tr><td>expiration date</td><td><?php echo htmlentities($transaction->creditCardDetails->expirationDate); ?></td></tr>
            </table>
        <?php
        } else {
            if (!isset($result)) { $result = null; } ?>
            <h1>Braintree Transparent Redirect Example</h1>
            <?php if (isset($result)) { ?>
                <div style="color: red;"><?php echo $result->errors->deepSize(); ?> error(s)</div>
            <?php } ?>
            <form method="POST" action="<?php echo Braintree_TransparentRedirect::url() ?>" autocomplete="off">
                <fieldset>
                    <legend>Customer</legend>
                    <?php braintree_text_field('First Name', 'transaction[customer][first_name]', $result); ?>
                    <?php braintree_text_field('Last Name', 'transaction[customer][last_name]', $result); ?>
                    <?php braintree_text_field('Email', 'transaction[customer][email]', $result); ?>
                </fieldset>
 
                <fieldset>
                    <legend>Payment Information</legend>
 
                    <?php braintree_text_field('Credit Card Number', 'transaction[credit_card][number]', $result); ?>
                    <?php braintree_text_field('Expiration Date (MM/YY)', 'transaction[credit_card][expiration_date]', $result); ?>
                    <?php braintree_text_field('CVV', 'transaction[credit_card][cvv]', $result); ?>
                </fieldset>
 
                <?php $tr_data = Braintree_TransparentRedirect::transactionData(
                    array('redirectUrl' => "http://" . $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH),
                    'transaction' => array('amount' => '10.00', 'type' => 'sale'))) ?>
                <input type="hidden" name="tr_data" value="<?php echo $tr_data ?>" />
 
                <br />
                <input type="submit" value="Submit" />
            </form>
        <?php } ?>
    </body>
</html>