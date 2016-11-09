<?php
/**
 * depenencies.php
 */
return [
    'invokables' => [
        // ApiMessageApiMessagesHydrator
        Reliv\RcmApiLib\Hydrator\ApiMessageApiMessagesHydrator::class =>
            Reliv\RcmApiLib\Hydrator\ApiMessageApiMessagesHydrator::class,

        // ArrayApiMessagesHydrator
        Reliv\RcmApiLib\Hydrator\ArrayApiMessagesHydrator::class =>
            Reliv\RcmApiLib\Hydrator\ArrayApiMessagesHydrator::class,

        // ExceptionApiMessagesHydrator
        Reliv\RcmApiLib\Hydrator\ExceptionApiMessagesHydrator::class =>
            Reliv\RcmApiLib\Hydrator\ExceptionApiMessagesHydrator::class,

        // StringApiMessagesHydrator
        Reliv\RcmApiLib\Hydrator\StringApiMessagesHydrator::class =>
            Reliv\RcmApiLib\Hydrator\StringApiMessagesHydrator::class,

        // PsrApiResponseBuilder
        Reliv\RcmApiLib\Service\PsrApiResponseBuilder::class =>
            Reliv\RcmApiLib\Service\PsrApiResponseBuilder::class
    ],
    'factories' => [
        /* MAIN HYDRATOR */
        'Reliv\RcmApiLib\Hydrator' =>
            Reliv\RcmApiLib\Factory\CompositeApiMessageHydratorFactory::class,

        // InputFilterApiMessagesHydrator
        Reliv\RcmApiLib\Hydrator\InputFilterApiMessagesHydrator::class =>
            Reliv\RcmApiLib\Factory\InputFilterMessagesHydratorFactory::class,

        // ResponseService
        Reliv\RcmApiLib\Service\ResponseService::class =>
            Reliv\RcmApiLib\Factory\ServiceResponseServiceFactory::class,
    ],
];
