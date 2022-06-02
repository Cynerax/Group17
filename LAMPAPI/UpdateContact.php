<?php 
    $inData = getRequestInfo();

    $contactId = $inData["contactId"];
    $contactName = $inData["contactName"];
    $contactPhone = $inData["contactPhone"];
  	$contactEmail = $inData["contactEmail"];

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
    else
    {
        $stmt = $conn->prepare("UPDATE Contacts SET Name=?,Phone=?,Email=? WHERE ID=?");
        $stmt->bind_param("sssi", $contactName, $contactPhone, $contactEmail, $contactId);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        returnwithError("");
    }

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
