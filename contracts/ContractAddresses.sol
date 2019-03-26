pragma solidity ^0.4.18;

contract ContractAddresses {
    address public owner;    
    uint16 public latestVersion;
    
    struct Info {
        uint16 version;
        address contractAddress;
        string abi;
        bool versionExists;        
    }

    mapping (uint16 => Info) addresses;

    function ContractAddresses () public {
        owner = msg.sender;    
    } 

    function addContractAddress (uint16 _version, address _contractAddress, string _abi) public {                
        
        if (msg.sender == owner) {
            if (!doesVersionExist (_version)) {
                Info storage thisAddress = addresses [_version];        
                thisAddress.version = _version;        
                thisAddress.contractAddress = _contractAddress;
                thisAddress.abi = _abi;
                thisAddress.versionExists = true;

                latestVersion = _version;
            }
        }
    }

    function doesVersionExist (uint16 _version) public view returns (bool) {
        return addresses[_version].versionExists;
    }

    function getContract (uint16 _version) public view returns (address, string) {
        return (addresses[_version].contractAddress, addresses[_version].abi);
    }
}