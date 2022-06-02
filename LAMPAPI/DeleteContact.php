<?php 
    $inData = getRequestInfo();

    $contactId = $inData["contactId"];

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
    else
    {
        $stmt = $conn->prepare("Delete from Contacts WHERE ID=?");
        $stmt->bind_param("s" ,$contactId);
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
