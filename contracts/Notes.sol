
//Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
// pragma solidity ^0.5.1;

// contract Notes {
//     address public owner;

//     struct Info {
//         uint48 dateCreated;
//         // string secretKey;
//         string encryptedNote;    
//     }

//     mapping (string => Info) notes;

//     constructor () public {
//         owner = msg.sender;    
//     } 

//     function createNote (string memory token, uint48 _dateCreated, string memory _encryptedNote) public {                
//         Info storage note = notes [token];
//         note.dateCreated = _dateCreated;
//         // note.secretKey = _secretKey;
//         note.encryptedNote = _encryptedNote;
//     } 
    
//     function getNote(string memory token) public view returns (uint48, string memory) {
//         return (notes[token].dateCreated, notes[token].encryptedNote);
//     }   
// }


// // //Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
pragma solidity ^0.4.18;

contract Notes {
    address public owner;

    struct Info {
        uint48 dateCreated;        
        string encryptedNote; 
        bool tokenExists;   
    }

    mapping (string => Info) notes;

    constructor () public {
        owner = msg.sender;    
    } 

    function createNote (string token, uint48 _dateCreated, string _encryptedNote) public {                
        
        // require(!notes[token].tokenExists);
        if (!doesTokenExist (token)) {
            Info storage note = notes [token];        
            note.dateCreated = _dateCreated;        
            note.encryptedNote = _encryptedNote;
            note.tokenExists = true;
        }
    } 

    function doesTokenExist (string token) public view returns (bool) {
        return notes[token].tokenExists;
    }

    function getNote(string token) public view returns (uint48, string) {
        return (notes[token].dateCreated, notes[token].encryptedNote);
    }   
}
