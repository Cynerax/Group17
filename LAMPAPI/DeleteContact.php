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
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=?");
        $stmt->bind_param("i" , $contactId);
        $stmt->execute();
        $stmt->close();
        $conn->close();
		returnWithError("Contact deleted")
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
