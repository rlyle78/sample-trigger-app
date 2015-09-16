M2X Sample Trigger Application
==============================

This [node.js](http://nodejs.org/) application intends to show a simple way of performing an action when an [AT&T M2X](https://m2x.att.com) Device Trigger notification is delivered by M2X. The application is configured to deploy on the [Heroku](https://www.heroku.com) Cloud Application Platform and provides two delivery methods; Email and SMS. 

**Email** is delivered via the [SendGrid](http://sendgrid.com/) API using the [Sendgrid Heroku Add-on](https://addons.heroku.com/sendgrid), and is configured to use Sendgrid's free *Starter* plan though you may upgrade your plan when you're ready to go into production.

**SMS** is delivered via the [Blower.io](https://addons.heroku.com/blowerio) Heroku add-on. It is important to note that **Blower.io does not offer a free plan**. Because of this, Blower.io is not included in the add-ons list of [`app.json`](https://github.com/attm2x/sample-trigger-app/blob/master/app.json) config file in order to prevent unwanted charges. Should you need SMS support, after you deploy your Heroku app, you will need to add the Blower.io Heroku Add-on to your app and choose a plan that suits your needs.


## Setup Application

### Via Heroku Deploy Button

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

You can check the status by going into the `/status` path, of your published application URL, which can be found in your Heroku settings under Domains.

## Setup Device, Stream(s) and Trigger

1. Signup for an [AT&T M2X Account](https://m2x.att.com/signup)
2. Create your first [Device](https://m2x.att.com/devices)
3. Add Stream(s) to your Device
4. Add a Trigger to your Device, configure the following parameters accordingly:
  * `callback_url` - set the Callback URL to the domain where your application will be hosted followed by `/m2x-trigger` which is the path that is configured to accept the POST request from M2X. You can find your domain in your app's Heroku settings under Heroku Domain. An example URL would be: http://your-domain.com/m2x-trigger
  * `custom_data` - the Custom Data field allows you to pass a custom block of characters, including serialized JSON, along with the Trigger notification that is delivered by M2X. For this application we'll using the Custom Data field to pass the delivery method, recipient and sender (if applicable).
    * Sample Custom Data for Email Delivery: 
      
      `{ "delivery_method": "email", "recipient": "you@your-domain.com", "sender": "no-reply@your-domain.com" }`
    * Sample Custom Data for SMS Delivery, note that you must include the country code in the recipient phone number: 
      
      `{ "delivery_method": "sms", "recipient": "+18005551212" }`
5. Start pushing values to your Device Stream(s) or test the Trigger in the M2X Developer Portal under the Triggers section for the Device. See [Test Trigger](https://m2x.att.com/developer/documentation/v2/triggers#Test-Trigger) documentation for more info.

Please consult the [AT&T M2X glossary](https://m2x.att.com/developer/documentation/v2/glossary) if you have questions about any M2X specific terms.


## Usage

Once everything is setup and values are being pushed to your Stream(s), every time Stream value(s) meet the Trigger condition(s) the M2X API will send a `POST`request to the Sample Trigger application at the `callback_url` provided. The Sample Trigger application will then process the request and send either an Email or SMS depending on the `delivery_method` specified in the `custom_data` field of your Trigger.

If the trigger is configured to Notify on Reset, a reset notification message will be delivered via the `delivery_method` whenever the trigger has been reset. The message content for reset notifications indicates that the notification is due to a reset of the trigger.


## License

This application is delivered under the MIT license. See [LICENSE](LICENSE) for the specific terms.
