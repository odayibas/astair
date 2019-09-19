package tr.com.astair.astair.controller;

import tr.com.astair.astair.config.Mqtt;
import tr.com.astair.astair.exception.ExceptionMessages;
import tr.com.astair.astair.exception.MqttException;
import tr.com.astair.astair.model.MqttPublishModel;
import tr.com.astair.astair.model.MqttSubscribeModel;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import tr.com.astair.astair.logger.MyLogger;

@RestController
@RequestMapping(value = "/api/mqtt")
public class MqttController {

    @PostMapping("publish")
    public void publishMessage(@RequestBody @Valid MqttPublishModel messagePublishModel,
                               BindingResult bindingResult) throws org.eclipse.paho.client.mqttv3.MqttException {
        if (bindingResult.hasErrors()) {
            throw new MqttException(ExceptionMessages.SOME_PARAMETERS_INVALID);
        }

        String msg = messagePublishModel.getMessage();
        byte[] payload = msg.getBytes();

        MyLogger.logger(msg, new MqttController());
        /*
        for logging purposes.
         */

        MqttMessage mqttMessage = new MqttMessage(payload);
        mqttMessage.setRetained(messagePublishModel.getRetained());

        Mqtt.getInstance().publish(messagePublishModel.getTopic(), mqttMessage);
        // Mqtt.getInstance().publish("Astair/MODEL/AC", new MqttMessage("1,COOL,HIGH,26,OFF".getBytes()));
    }

    @GetMapping("subscribe")
    public List<MqttSubscribeModel> subscribeChannel(@RequestParam(value = "Astair/+/AC/CONF/GET") String topic,
                                                     @RequestParam(value = "wait_millis") Integer waitMillis)
            throws InterruptedException, org.eclipse.paho.client.mqttv3.MqttException {
        List<MqttSubscribeModel> messages = new ArrayList<>();
        CountDownLatch countDownLatch = new CountDownLatch(10);
        Mqtt.getInstance().subscribeWithResponse(topic, (s, mqttMessage) -> {
            MqttSubscribeModel mqttSubscribeModel = new MqttSubscribeModel();
            mqttSubscribeModel.setId(mqttMessage.getId());
            mqttSubscribeModel.setMessage(new String(mqttMessage.getPayload()));
            mqttSubscribeModel.setQos(mqttMessage.getQos());
            messages.add(mqttSubscribeModel);
            countDownLatch.countDown();
        });

        countDownLatch.await(waitMillis, TimeUnit.MILLISECONDS);

        return messages;
    }

}