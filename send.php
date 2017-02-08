<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
       echo('qwer');    
        $to = 'ivthanator@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Обратный звонок'; //Загаловок сообщения
        $message = 'e'; //Текст нащего сообщения можно использовать HTML теги
       // $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
       $est = mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
        echo $est;
        
}
?>