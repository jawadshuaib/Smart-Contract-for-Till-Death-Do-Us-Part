pragma solidity ^0.4.18;

contract NotesEditable {
    address public owner;    
    
    struct Info {
        uint48 dateCreated;        
        string encryptedNote; 
        bool tokenExists;
        string noteOwnerHashed;
    }

    mapping (string => Info) notes;

    function NotesEditable () public {
        owner = msg.sender;    
    } 

    function createNote (string token, uint48 _dateCreated, string _noteOwnerHashed, string _encryptedNote) public {                
        
        if (!doesTokenExist (token)) {
            Info storage note = notes [token];        
            note.dateCreated = _dateCreated;        
            note.encryptedNote = _encryptedNote;
            note.tokenExists = true;
            note.noteOwnerHashed = _noteOwnerHashed;
        }
    }
    
    function editNote (string token, string _noteOwnerHashed, string _newNote) public {        

        if (keccak256(bytes(_noteOwnerHashed)) == keccak256(bytes (notes[token].noteOwnerHashed))) {
            if (doesTokenExist (token)) {
                if (bytes(_newNote).length > 0) {
                    notes[token].encryptedNote = _newNote;    
                }
            }
        }        
    }

    function doesTokenExist (string token) public view returns (bool) {
        return notes[token].tokenExists;
    }

    function getNote(string token) public view returns (uint48, string, string) {
        return (notes[token].dateCreated, notes[token].encryptedNote, notes[token].noteOwnerHashed);
    }    
}
