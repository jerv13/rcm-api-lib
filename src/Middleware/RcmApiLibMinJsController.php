<?php

namespace Reliv\RcmApiLib\Middleware;

use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
 * Class RcmApiLibMinJsController
 *
 * @author    James Jervis <jjervis@relivinc.com>
 * @copyright 2016 Reliv International
 * @license   License.txt
 * @link      https://github.com/reliv
 */
class RcmApiLibMinJsController extends AbstractSingleAssetController
{
    /**
     * Returns the config;
     *
     * Return format:
     * [
     *     'path' => __DIR__ . '/../../public/rcm-api-lib/dist/rcm-api-lib.js',
     *     'headers' => [
     *         'content-type', 'application/javascript'
     *     ]
     * ];
     *
     * @return array
     */
    protected function getConfig()
    {
        return [
            'path' => __DIR__ . '/../../public/rcm-api-lib/dist/rcm-api-lib.min.js',
            'headers' => [
                'content-type' => 'application/javascript'
            ]
        ];
    }
}
