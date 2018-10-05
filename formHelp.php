<?php
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $textarea = $_POST['textarea'];
    
    $mail_message = '
    <html>
    <head>
        <title>Заказ консультации</title>
    </head>
    <body>
        <h2>Заказ консультации</h2>
        <ul>
            <li>Имя:' . $name . '</li>
            <li>Телефон: ' . $phone . '</li>
            <li>Телефон: ' . $email . '</li>
            <li>Телефон: ' . $textarea . '</li>
        </ul>
    </body>
    </html>';
    $headers = "From: Администратор сайта <admin@front-dev.com>\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";
    $mail = mail('vankert353@gmail.com', 'Заказ консультации', $mail_message, $headers);

?>