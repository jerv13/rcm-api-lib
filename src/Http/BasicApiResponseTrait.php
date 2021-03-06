<?php

namespace Reliv\RcmApiLib\Http;

use Reliv\RcmApiLib\Model\ApiMessage;
use Reliv\RcmApiLib\Model\ApiMessages;

/**
 * @author James Jervis - https://github.com/jerv13
 */
trait BasicApiResponseTrait
{
    /**
     * @var mixed
     */
    protected $data = null;

    /**
     * @var ApiMessages
     */
    protected $messages;

    /**
     * setData
     *
     * @param array|null $data
     *
     * @return void
     */
    public function setData($data)
    {
        $this->data = $data;
    }

    /**
     * getData
     *
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * addApiMessages
     *
     * @param array $apiMessages ApiMessage
     *
     * @return void
     */
    public function addApiMessages($apiMessages = [])
    {
        foreach ($apiMessages as $apiMessage) {
            $this->addApiMessage($apiMessage);
        }
    }

    /**
     * setApiMessages
     *
     * @param ApiMessages $apiMessages
     *
     * @return void
     */
    public function setApiMessages(ApiMessages $apiMessages)
    {
        $this->messages = $apiMessages;
    }

    /**
     * getApiMessages
     *
     * @return ApiMessages
     */
    public function getApiMessages()
    {
        return $this->messages;
    }

    /**
     * addApiMessage
     *
     * @param ApiMessage $apiMessage
     *
     * @return void
     */
    public function addApiMessage(ApiMessage $apiMessage)
    {
        $this->messages->add($apiMessage);
    }
}
