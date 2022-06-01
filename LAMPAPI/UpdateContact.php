<?php 
    $inData = getRequestInfo();

    $contactName = $inData["contactName"];
    $contactPhone = $inData["contactPhone"];
  	$contactEmail = $inData["contactEmail"];
    $contactId = $inData["contactId"];

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
        
        if($stmt->error)
        {
            returnWithError("Contact cannot be found").
        }
        else
        {
            returnWithInfo()
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

    function returnWithError($err)
	{
		sendResultInfoAsJson($err);
	}
	
	function returnWithInfo($updateInfo)
	{
		sendResultInfoAsJson($contactName, $contactPhone, $contactEmail, $userId, $contactId);
	}

?>
