import assert from "node:assert/strict";
import type { IssueId, ProjectId, UserId } from "../domain/types.js";
import { InMemoryIssueRepository } from "../infrastructure/in-memory-issue-repository.js";
import { IssueService } from "./issue-service.js";

async function runTests() {
    console.log("Starting IssueService test suit...\n");

    //Test 1: successfully create an issue with defaults
    {
        const repo = new InMemoryIssueRepository(); // creates a fake in memory database
        const service = new IssueService(repo);
    

    const result = await service.createIssue({
        title: "Support dark mode",
        projectId: "proj_forge" as ProjectId,
        authorId: "user_lead" as UserId,
    });
    assert.equal(result.ok,true,"Expected createIssue to succeed");
    if(result.ok){
        assert.equal(result.value.title,"Support dark mode");
        assert.equal(result.value.status,"backlog","Default status must be backlog");
        assert.equal(result.value.priority,"medium","Default priority must be medium");
        assert.equal(result.value.description,null,"Default description must be null");

        const savedIssue = await repo.findById(result.value.id);
        assert.notEqual(savedIssue,null,"Issue must exist in the repository");
        assert.equal(savedIssue?.title,"Support dark mode");
    }
    console.log(`✅ Test 1 Passed: createIssue set defaults and saves to repository`);
}

//Test 2
{
    const repo = new InMemoryIssueRepository();
    const service = new IssueService(repo);

    const result = await service.createIssue({
        title: "Support dark mode",
        projectId: "proj_forge" as ProjectId,
        authorId: "User_id" as UserId,
        status: "backlog",
    })

    assert.equal(result.ok,true,"Expected result to succeed");
    if(!result.ok) return;

    const createdIssue = result.value;

    const transitionResult = await service.transitionIssue(createdIssue.id,"todo");
    assert.equal(transitionResult.ok,true, "transition did not succeed");
    if(!transitionResult.ok) return;
    assert.equal(transitionResult.value.status,"todo","the transition to todo was unsucessful");
    
    console.log(`✅ test 2 Passed: valid transition updates`)

}
//test 3: Illegal transition
{
    const repo = new InMemoryIssueRepository();
    const service = new IssueService(repo);

    const createResult = await service.createIssue({
         title: "Support dark mode",
        projectId: "proj_forge" as ProjectId,
        authorId: "User_id" as UserId,
        status: "backlog",
    });
        assert.equal(createResult.ok,true,"Expected result to fail");
    if(!createResult.ok){
    return {};
    }

    const transitionResult = await service.transitionIssue(createResult.value.id,"done");

    assert.equal(transitionResult.ok,false,"transition from backlog to done must be rejected");

    if(!transitionResult.ok){
        assert.equal(transitionResult.error.code,"INVALID_TRANSITION");
    }

    const savedIssue = await repo.findById(createResult.value.id)
    assert.equal(savedIssue?.status, "backlog");
    console.log(`✅ test 3 passed: invalid transition rejected with INVALID_TRANSITION`)

}
// test 4:
{
     const repo = new InMemoryIssueRepository();
    const service = new IssueService(repo);

    const result = await service.transitionIssue("iss_does_not_exisit" as IssueId,"todo");
    assert.equal(result.ok,false,"transition of non existent issue failed");
    if(!result.ok){
        assert.equal(result.error.code,"NOT_FOUND","no error found");
    }

    console.log(`✅ test 4 passed. Non existent issue return NOT_FOUND`)
}

}



runTests().catch(err => {
    console.error("❌ Test suite failed",err);
    process.exit(1);
})