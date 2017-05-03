<?php
/**
 * @package dompdf
 * @link    http://www.dompdf.com/
 * @author  Fabien Ménager <fabien.menager@gmail.com>
 * @license http://www.gnu.org/copyleft/lesser.html GNU Lesser General Public License
 * @version $Id: javascript_embedder.cls.php 504 2012-11-04 16:10:14Z fabien.menager $
 */

/**
 * Embeds Javascript into the PDF document
 *
 * @access private
 * @package dompdf
 */
class Javascript_Embedder {
  
  /**
   * @var DOMPDF
   */
  protected $_dompdf;

  function __construct(DOMPDF $dompdf) {
    $this->_dompdf = $dompdf;
  }

  function insert($script) {
    $this->_dompdf->get_canvas()->javascript($script);
  }

  function render(Frame $frame) {
    if ( !DOMPDF_ENABLE_JAVASCRIPT )
      return;
      
    $this->insert($frame->get_node()->nodeValue);
  }
}
