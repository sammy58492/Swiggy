<?php
/*
 * Copyright (C) 2015 Andy Pieters <andy@andypieters.nl>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

namespace Paynl;

use \Paynl\Api\Validate\isPayServerIp as Api;

/**
 * Description of Paymentmethods
 *
 * @author Andy Pieters <andy@andypieters.nl>
 */
class Validate
{
    public static function isPayServerIp($ipAddress)
    {
        $api = new Api();
        $api->setIpAddress($ipAddress);
        return $api->doRequest();
    }
}
